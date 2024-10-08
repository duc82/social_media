import { Injectable } from "@nestjs/common";
import { DataSource, FindManyOptions, FindOneOptions, IsNull } from "typeorm";
import { Message } from "./entities/messages.entity";
import { CreateMessageDto } from "./messages.dto";
import { UserService } from "src/modules/users/users.service";
import { MessageFile } from "./entities/message_files.entity";
import { QueryDto } from "src/shared/dto/query.dto";

@Injectable()
export class MessagesService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly userService: UserService,
  ) {}

  async findOne(options?: FindOneOptions<Message>) {
    return this.dataSource.getRepository(Message).findOne(options);
  }

  async find(options?: FindManyOptions<Message>) {
    return this.dataSource.getRepository(Message).find(options);
  }

  async getByConversation(id: string, query: QueryDto) {
    const { page, limit } = query;

    const skip = (page - 1) * limit;

    const [messages, total] = await this.dataSource
      .getRepository(Message)
      .findAndCount({
        where: {
          conversation: {
            id,
          },
          deletedAt: IsNull(),
        },
        relations: [
          "user",
          "files",
          "user.profile",
          "reads",
          "reads.user",
          "conversation",
        ],
        take: limit,
        skip,
        order: {
          createdAt: "DESC",
        },
        select: {
          conversation: { id: true },
        },
      });

    messages.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

    return { messages, total, page, limit };
  }

  async markAsRead(conversationId: string, currentUserId: string) {
    await this.dataSource.query("SELECT mark_messages_as_read($1, $2)", [
      conversationId,
      currentUserId,
    ]);

    return { message: "Mark as read successfully" };
  }

  async create(body: CreateMessageDto, currentUserId: string) {
    const user = await this.userService.findOne({
      where: { id: currentUserId },
      relations: ["profile"],
    });

    const files = body.files.map((file) => {
      return this.dataSource.getRepository(MessageFile).create(file);
    });

    const message = this.dataSource.getRepository(Message).create({
      content: body.content,
      files,
      conversation: {
        id: body.conversation,
      },
      user,
      reads: [
        {
          user: { id: currentUserId },
        },
      ],
    });

    await message.save();

    return message;
  }
}
