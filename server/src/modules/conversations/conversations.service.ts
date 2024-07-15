import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { DataSource, In } from "typeorm";
import { Conversation } from "./entities/conversations.entity";
import { CreateConversationDto } from "./conversations.dto";
import { User } from "src/modules/users/entities/users.entity";
import { QueryDto } from "src/shared/dto/query.dto";
import { ConversationMember } from "./entities/conversation_members.entity";
import { MemberRole } from "src/enums/role.enum";

@Injectable()
export class ConversationsService {
  constructor(private readonly dataSource: DataSource) {}

  async getAll(currentUserId: string, query: QueryDto) {
    const { page, limit, search } = query;

    const skip = (page - 1) * limit;

    const [conversations, total] = await this.dataSource
      .getRepository(Conversation)
      .createQueryBuilder("c")
      .leftJoinAndSelect("c.members", "member")
      .leftJoinAndSelect("member.user", "user")
      .leftJoinAndSelect("user.profile", "profile")
      .leftJoinAndSelect(
        "c.messages",
        "message",
        'message.createdAt = (SELECT MAX(m."createdAt") FROM messages m WHERE m."conversationId" = c.id)',
      )
      .leftJoinAndSelect("message.files", "file")
      .leftJoinAndSelect("message.user", "message_user")
      .where((qb) => {
        const subQuery = qb
          .subQuery()
          .select("member.conversationId")
          .from(ConversationMember, "member")
          .where("member.userId = :currentUserId", { currentUserId })
          .getQuery();

        return `c.id IN ${subQuery}`;
      })
      .andWhere(search ? "c.name ILIKE :search" : "TRUE", {
        search: `%${search}%`,
      })
      .andWhere("c.deleteAt IS NULL")
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
          .select("member.conversationId")
          .from(ConversationMember, "member")
          .where("member.userId IN (:...userIds)", { userIds })
          .groupBy("member.conversationId")
          .having("COUNT(member.conversationId) = :userCount", {
            userCount: userIds.length,
          })
          .getQuery();

        return `EXISTS ${subQuery}`;
      })
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

    if (conversation.deletedAt) {
      conversation.deletedAt = null;
      await conversation.save();
    }

    return conversation;
  }

  async getById(id: string) {
    const conversation = await this.dataSource
      .getRepository(Conversation)
      .findOne({
        where: {
          id,
          deletedAt: null,
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

  async countUnseen(currentUserId: string) {
    return await this.dataSource
      .getRepository(Conversation)
      .createQueryBuilder("c")
      .leftJoinAndSelect("c.members", "member")
      .where("member.userId = :currentUserId", { currentUserId })
      .andWhere("member.seen = false")
      .getCount();
  }
}
