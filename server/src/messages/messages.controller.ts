import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from "@nestjs/common";
import { MessagesService } from "./messages.service";
import { CreateMessageDto } from "./messages.dto";

@Controller("api/messages")
export class MessagesController {
  constructor(private readonly messageService: MessagesService) {}

  @Get(":conversationId")
  async getAll(
    @Param("conversationId", new ParseUUIDPipe()) conversationId: string,
  ) {
    return this.messageService.getAll(conversationId);
  }

  @Post("create")
  async create(@Body() body: CreateMessageDto) {
    return this.messageService.create(body);
  }
}
