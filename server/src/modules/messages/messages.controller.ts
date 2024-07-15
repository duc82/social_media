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
import { CreateMessageDto } from "./messages.dto";
import { QueryDto } from "src/shared/dto/query.dto";
import { AuthGuard } from "src/common/guards/auth.guard";
import { User } from "src/common/decorators/user.decorator";

@UseGuards(AuthGuard)
@Controller("api/messages")
export class MessagesController {
  constructor(private readonly messageService: MessagesService) {}

  @Get("by-conversation/:conversationId")
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
