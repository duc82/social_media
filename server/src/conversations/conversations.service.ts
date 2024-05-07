import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { Conversation } from "./entities/conversation.entity";
import { User } from "src/users/entities/user.entity";

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
}
