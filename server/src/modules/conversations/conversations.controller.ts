import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from "@nestjs/common";
import { ConversationsService } from "./conversations.service";
import {
  CreateConversationDto,
  CreateConversationWithMessageDto,
} from "./conversations.dto";
import { QueryDto } from "src/shared/dto/query.dto";
import { AuthGuard } from "src/common/guards/auth.guard";
import { User } from "src/common/decorators/user.decorator";

@UseGuards(AuthGuard)
@Controller("api/conversations")
export class ConversationsController {
  constructor(private readonly conversationsService: ConversationsService) {}

  @Get()
  async getAll(
    @User("userId") currentUserId: string,
    @Query() query: QueryDto,
  ) {
    return this.conversationsService.getAll(currentUserId, query);
  }

  @Get("by-user/:id")
  async getByUser(
    @User("userId") currentUserId: string,
    @Param("id", new ParseUUIDPipe()) id: string,
  ) {
    return this.conversationsService.getByUsersOrCreate([currentUserId, id]);
  }

  @Get(":id")
  async getById(@Param("id", new ParseUUIDPipe()) id: string) {
    return this.conversationsService.getById(id);
  }

  @Get("count/unread")
  async countUnread(@User("userId") currentUserId: string) {
    return this.conversationsService.countUnread(currentUserId);
  }

  @Post("create")
  async create(@Body() body: CreateConversationDto) {
    return this.conversationsService.create(body);
  }

  @Post("create-with-message")
  async createWithMessage(
    @Body() body: CreateConversationWithMessageDto,
    @User("userId") userId: string,
  ) {
    return this.conversationsService.createWithMessage(body, userId);
  }

  @Put("remove/:id")
  async remove(@Param("id", new ParseUUIDPipe()) id: string) {
    return this.conversationsService.remove(id);
  }

  @Put("restore/:id")
  async restore(@Param("id", new ParseUUIDPipe()) id: string) {
    return this.conversationsService.restore(id);
  }

  @Delete("delete/:id")
  async delete(@Param("id", new ParseUUIDPipe()) id: string) {
    return this.conversationsService.delete(id);
  }
}
