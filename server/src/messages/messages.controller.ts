import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { MessagesService } from "./messages.service";
import { AuthGuard } from "src/auth/auth.guard";
import { User } from "src/users/users.decorator";
import { CreateMessageDto } from "./messages.dto";
import { QueryDto } from "src/dto/query.dto";

@UseGuards(AuthGuard)
@Controller("api/messages")
export class MessagesController {
  constructor(private readonly messageService: MessagesService) {}

  @Get(":conversationId")
  async getByConversation(
    @Param("conversationId", new ParseUUIDPipe()) conversationId: string,
    @Query() query: QueryDto,
  ) {
    return this.messageService.getByConversation(conversationId, query);
  }

  @Post("create")
  async create(
    @Body() body: CreateMessageDto,
    @User("userId") currentUserId: string,
  ) {
    return this.messageService.create(body, currentUserId);
  }
}
