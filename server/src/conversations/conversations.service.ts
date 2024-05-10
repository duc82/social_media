import { BadRequestException, Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { Conversation } from "./entities/conversation.entity";
import { User } from "src/users/entities/user.entity";
import { CreateConversationDto } from "./dto/conversations.dto";

@Injectable()
export class ConversationsService {
  constructor(private readonly dataSource: DataSource) {}

  async getAll(userId: string) {
    return this.dataSource
      .getRepository(Conversation)
      .createQueryBuilder("c")
      .leftJoinAndSelect("c.users", "users")
      .leftJoinAndSelect("users.profile", "profile")
      .where((qb) => {
        const subQuery = qb
          .subQuery()
          .select("user.conversationId")
          .from(User, "user")
          .where("user.id = :userId")
          .getQuery();
        return "users.conversationId IN " + subQuery;
      })
      .setParameter("userId", userId)
      .getMany();
  }

  async create(body: CreateConversationDto) {
    const userIds = body.users.map((u) => ({ id: u }));

    const conversationExists = await this.dataSource
      .getRepository(Conversation)
      .exists({
        where: {
          users: userIds,
        },
      });

    if (conversationExists) {
      throw new BadRequestException("Conversation already exists");
    }

    const conversation = this.dataSource.getRepository(Conversation).create({
      isGroup: body.isGroup,
      users: userIds,
    });

    await conversation.save();

    return conversation;
  }
}
