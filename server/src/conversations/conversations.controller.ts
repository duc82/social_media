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
import { ConversationsService } from "./conversations.service";
import { User } from "src/users/users.decorator";
import { CreateConversationDto } from "./conversations.dto";
import { AuthGuard } from "src/auth/auth.guard";
import { QueryDto } from "src/dto/query.dto";

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

  @Post("create")
  async create(@Body() body: CreateConversationDto) {
    return this.conversationsService.create(body);
  }
}
