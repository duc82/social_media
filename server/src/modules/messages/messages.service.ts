import { Injectable } from "@nestjs/common";
import { DataSource, FindManyOptions, FindOneOptions } from "typeorm";
import { Message } from "./entities/messages.entity";
import { CreateMessageDto } from "./messages.dto";
import { UsersService } from "src/modules/users/users.service";
import { QueryDto } from "src/shared/dto/query.dto";
import { FirebaseService } from "../firebase/firebase.service";

@Injectable()
export class MessagesService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly usersService: UsersService,
    private readonly firebaseService: FirebaseService,
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

  async markAsRead(conversationId: string, userId: string) {
    await this.dataSource.query("SELECT mark_messages_as_read($1, $2)", [
      conversationId,
      userId,
    ]);

    return { message: "Mark as read successfully" };
  }

  async create(
    body: CreateMessageDto,
    files: Express.Multer.File[],
    userId: string,
  ) {
    const user = await this.usersService.userRepository.findOne({
      where: { id: userId },
    });

    const newFiles = await this.firebaseService.uploadFiles(files, "messages");

    const message = this.dataSource.getRepository(Message).create({
      content: body.content,
      files: newFiles,
      conversation: {
        id: body.conversation,
      },
      user,
      reads: [
        {
          user,
        },
      ],
    });

    await message.save();

    return message;
  }
}
