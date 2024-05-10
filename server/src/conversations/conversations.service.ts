import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { DataSource, Not } from "typeorm";
import { Conversation } from "./conversation.entity";
import { User } from "src/users/entities/user.entity";
import { CreateConversationDto } from "./conversations.dto";

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
      name: body.name,
      users: userIds,
    });

    await conversation.save();

    return conversation;
  }

  async getById(id: string) {
    const conversation = await this.dataSource
      .getRepository(Conversation)
      .findOne({ where: { id } });

    if (!conversation) {
      throw new NotFoundException("Conversation not found");
    }

    return conversation;
  }

  async findOrCreate(id: string, body: CreateConversationDto) {
    const conversation = await this.dataSource
      .getRepository(Conversation)
      .find({
        where: { id },
      });

    // create
    if (!conversation) {
      const newConversation = await this.create(body);
      return newConversation;
    }

    return conversation;
  }

  async delete(id: string) {
    const conversationExists = await this.dataSource
      .getRepository(Conversation)
      .existsBy({
        id,
      });

    if (!conversationExists) {
      throw new NotFoundException("Conversation not found");
    }

    const deletedResult = await this.dataSource
      .getRepository(Conversation)
      .delete({
        id,
      });

    return { message: "Conversation deleted successfully", deletedResult };
  }
}
