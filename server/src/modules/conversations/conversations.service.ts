import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { DataSource, FindOneOptions, In, IsNull, Not } from "typeorm";
import { Conversation } from "./entities/conversations.entity";
import { CreateConversationDto } from "./conversations.dto";
import { User } from "src/modules/users/entities/users.entity";
import { QueryDto } from "src/shared/dto/query.dto";
import { ConversationMember } from "./entities/conversation_members.entity";
import { MemberRole } from "src/enums/role.enum";
import { Message } from "../messages/entities/messages.entity";
import { MessageFile } from "../messages/entities/message_files.entity";

@Injectable()
export class ConversationsService {
  constructor(private readonly dataSource: DataSource) {}

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
      .andWhere("c.deletedAt IS NULL")
      .orderBy("c.createdAt", "DESC")
      .take(limit)
      .skip(skip)
      .getManyAndCount();

    return { conversations, total, page, limit };
  }

  async getByUsersOrCreate(userIds: string[]) {
    const conversation = await this.dataSource
      .getRepository(Conversation)
      .createQueryBuilder("c")
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

        return `EXISTS ${subQuery}`;
      })
      .andWhere("c.deletedAt IS NULL")
      .getOne();

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
    const { members, name, image } = body;

    const users = await this.dataSource.getRepository(User).find({
      where: { id: In(members) },
    });

    if (users.length !== members.length) {
      throw new BadRequestException("Invalid members");
    }

    const conversation = this.dataSource.getRepository(Conversation).create({
      name,
      image,
      members: members.map((id, i) => ({
        user: { id },
        role: i === 0 ? MemberRole.ADMIN : MemberRole.MEMBER,
      })),
    });
    await conversation.save();

    return { message: "Conversation created successfully", conversation };
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
      .where("mr.messageId IS NULL")
      .getCount();
  }

  async remove(id: string) {
    const result = await this.dataSource
      .getRepository(Conversation)
      .createQueryBuilder()
      .softDelete()
      .where("id = :id AND deletedAt IS NULL", { id })
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
