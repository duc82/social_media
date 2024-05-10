import { Injectable } from "@nestjs/common";
import { ConversationsService } from "src/conversations/conversations.service";
import { DataSource } from "typeorm";
import { Message } from "./entities/message.entity";
import { CreateMessageDto } from "./messages.dto";

@Injectable()
export class MessagesService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly conversationService: ConversationsService,
  ) {}

  async getAll(conversationId: string) {
    const messages = await this.dataSource.getRepository(Message).find({
      where: {
        conversation: {
          id: conversationId,
        },
      },
    });

    return messages;
  }

  async create(body: CreateMessageDto) {
    return body;
  }
}
