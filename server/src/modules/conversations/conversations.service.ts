import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { DataSource, FindOneOptions, In, IsNull } from "typeorm";
import { Conversation } from "./entities/conversations.entity";
import {
  CreateConversationDto,
  CreateConversationWithMessageDto,
} from "./conversations.dto";
import { User } from "src/modules/users/entities/users.entity";
import { QueryDto } from "src/shared/dto/query.dto";
import { ConversationMember } from "./entities/conversation_members.entity";
import { MemberRole } from "src/enums/role.enum";
import { Message } from "../messages/entities/messages.entity";
import { MessageFile } from "../messages/entities/message_files.entity";
import { UsersService } from "../users/users.service";
import { MessagesService } from "../messages/messages.service";
import { FirebaseService } from "../firebase/firebase.service";

@Injectable()
export class ConversationsService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly usersService: UsersService,
    private readonly messageService: MessagesService,
    private readonly firebaseService: FirebaseService,
  ) {}

  async findOne(options?: FindOneOptions<Conversation>) {
    return this.dataSource.getRepository(Conversation).findOne(options);
  }

  async getAll(currentUserId: string, query: QueryDto) {
    const { page, limit, search } = query;

    const skip = (page - 1) * limit;

    const messageSubQuery = this.dataSource
      .createQueryBuilder()
      .subQuery()
      .select("m.id")
      .from(Message, "m")
      .orderBy("m.createdAt", "DESC")
      .limit(1);

    const messageFileSubQuery = this.dataSource
      .createQueryBuilder()
      .subQuery()
      .select("mf.id")
      .from(MessageFile, "mf")
      .orderBy("mf.id", "DESC")
      .limit(1);

    const [conversations, total] = await this.dataSource
      .getRepository(Conversation)
      .createQueryBuilder("c")
      .leftJoinAndSelect("c.members", "cm")
      .leftJoinAndSelect("cm.user", "user")
      .leftJoinAndSelect("user.profile", "profile")
      .leftJoinAndSelect(
        "c.messages",
        "m",
        `m.id = ${messageSubQuery.getQuery()}`,
      )
      .leftJoinAndSelect(
        "m.files",
        "mf",
        `mf.id = ${messageFileSubQuery.getQuery()}`,
      )
      .leftJoinAndSelect("m.user", "mu")
      .where((qb) => {
        const subQuery = qb
          .subQuery()
          .select("cm.conversationId")
          .from(ConversationMember, "cm")
          .where("cm.userId = :currentUserId", { currentUserId })
          .getQuery();
        return `c.id IN ${subQuery}`;
      })
      .andWhere(search ? "c.name ILIKE :search" : "TRUE", {
        search: `%${search}%`,
      })
      .orderBy("m.createdAt", "DESC", "NULLS LAST")
      .take(limit)
      .skip(skip)
      .getManyAndCount();

    return { conversations, total, page, limit };
  }

  async getByUsersOrCreate(userIds: string[]) {
    const query = this.dataSource
      .getRepository(Conversation)
      .createQueryBuilder("c")
      .withDeleted()
      .where((qb) => {
        const subQuery = qb
          .subQuery()
          .select("cm.conversationId")
          .from(ConversationMember, "cm")
          .where("cm.userId IN (:...userIds)", { userIds })
          .groupBy("cm.conversationId")
          .having("COUNT(cm.conversationId) = :userCount", {
            userCount: userIds.length,
          })
          .getQuery();

        return `c.id IN ${subQuery}`;
      });

    const conversation = await query.getOne();

    if (!conversation) {
      const newConversation = this.dataSource
        .getRepository(Conversation)
        .create({
          members: userIds.map((id, i) => ({
            user: { id },
            role: i === 0 ? MemberRole.ADMIN : MemberRole.MEMBER,
          })),
        });

      await newConversation.save();
      return newConversation;
    }

    if (conversation.deletedAt) {
      await this.restore(conversation.id);
    }

    return conversation;
  }

  async getById(id: string) {
    const conversation = await this.dataSource
      .getRepository(Conversation)
      .findOne({
        where: {
          id,
          deletedAt: IsNull(),
        },
        relations: ["members", "members.user", "members.user.profile"],
      });

    if (!conversation) {
      throw new NotFoundException("Conversation not found");
    }

    return conversation;
  }

  async create(body: CreateConversationDto) {
    const { members, name } = body;

    const users = await this.dataSource.getRepository(User).find({
      where: { id: In(members) },
    });

    if (users.length !== members.length) {
      throw new BadRequestException("Invalid members");
    }

    const conversation = this.dataSource.getRepository(Conversation).create({
      name,
      members: members.map((id, i) => ({
        user: { id },
        role: i === 0 ? MemberRole.ADMIN : MemberRole.MEMBER,
      })),
    });
    await conversation.save();

    return { message: "Conversation created successfully", conversation };
  }

  async createWithMessage(
    body: CreateConversationWithMessageDto,
    files: Express.Multer.File[],
    userId: string,
  ) {
    const userIds = [userId, ...body.members];

    const conversation = await this.getByUsersOrCreate(userIds);

    const message = await this.messageService.create(
      {
        content: body.content,
        conversation: conversation.id,
      },
      files,
      userId,
    );

    return { conversation, message };
  }

  async countUnread(currentUserId: string) {
    return this.dataSource
      .getRepository(Conversation)
      .createQueryBuilder("c")
      .select("c.id")
      .innerJoin("c.messages", "m")
      .leftJoin("m.reads", "mr", "mr.userId = :currentUserId", {
        currentUserId,
      })
      .where((qb) => {
        const subQuery = qb
          .subQuery()
          .select("cm.conversationId")
          .from(ConversationMember, "cm")
          .where("cm.userId = :currentUserId", { currentUserId })
          .getQuery();
        return `c.id IN ${subQuery}`;
      })
      .andWhere("mr.messageId IS NULL")
      .getCount();
  }

  async remove(id: string) {
    const result = await this.dataSource
      .getRepository(Conversation)
      .createQueryBuilder()
      .softDelete()
      .where("id = :id AND deletedAt IS NULL", { id })
      .execute();

    await this.dataSource
      .getRepository(Message)
      .createQueryBuilder()
      .softDelete()
      .where("conversationId = :conversationId", { conversationId: id })
      .execute();

    if (result.affected === 0) {
      throw new NotFoundException("Conversation not found");
    }

    return { message: "Removed conversation successfully" };
  }

  async restore(id: string) {
    const result = await this.dataSource
      .getRepository(Conversation)
      .createQueryBuilder()
      .restore()
      .where("id = :id", { id })
      .execute();

    if (result.affected === 0) {
      throw new NotFoundException("Conversation not found");
    }

    return { message: "Restored conversation successfully" };
  }

  async delete(id: string) {
    const result = await this.dataSource
      .getRepository(Conversation)
      .createQueryBuilder()
      .delete()
      .where("id = :id", { id })
      .execute();

    if (result.affected) {
      throw new NotFoundException("Conversation not found");
    }

    return { message: "Deleted conversation successfully" };
  }
}
