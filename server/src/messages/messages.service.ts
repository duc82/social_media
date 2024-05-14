import { Injectable } from "@nestjs/common";
import { ConversationsService } from "src/conversations/conversations.service";
import { DataSource } from "typeorm";
import { Message } from "./entities/messages.entity";
import { CreateMessageDto } from "./messages.dto";
import { UserService } from "src/users/users.service";
import { MessageFile } from "./entities/message_files.entity";

@Injectable()
export class MessagesService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly conversationService: ConversationsService,
    private readonly userService: UserService,
  ) {}

  async getAll(conversationId: string) {
    const messages = await this.dataSource.getRepository(Message).find({
      where: {
        conversation: {
          id: conversationId,
        },
      },
      relations: ["user", "files"],
    });

    return messages;
  }

  async create(body: CreateMessageDto, currentUserId: string) {
    const user = await this.userService.getById(currentUserId, {
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
    });

    await message.save();

    return {
      data: message,
      message: "Message sent successfully",
    };
  }
}
