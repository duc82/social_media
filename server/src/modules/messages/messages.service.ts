import { Injectable } from "@nestjs/common";
import { DataSource, FindManyOptions, FindOneOptions } from "typeorm";
import { Message } from "./entities/messages.entity";
import { CreateMessageDto } from "./messages.dto";
import { UserService } from "src/modules/users/users.service";
import { QueryDto } from "src/shared/dto/query.dto";
import { FirebaseService } from "../firebase/firebase.service";
import { Call } from "./entities/calls.entity";

@Injectable()
export class MessagesService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly userService: UserService,
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
          "call",
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
    const user = await this.userService.findOne({
      where: { id: userId },
      relations: ["profile"],
    });

    const newFiles = await this.firebaseService.uploadFiles(files, "messages");

    const call =
      body.callType &&
      this.dataSource.getRepository(Call).create({
        type: body.callType,
        status: body.callStatus,
        caller: { id: body.callerId },
        callee: { id: body.calleeId },
        duration: body.callDuration,
      });

    const message = this.dataSource.getRepository(Message).create({
      content: body.content,
      files: newFiles,
      conversation: {
        id: body.conversation,
      },
      call,
      user,
      reads: [
        {
          user: { id: userId },
        },
      ],
    });

    await message.save();

    return message;
  }
}
