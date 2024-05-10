import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { ConversationsService } from "./conversations.service";
import { User } from "src/users/users.decorator";
import { CreateConversationDto } from "./conversations.dto";

@Controller("api/conversations")
export class ConversationsController {
  constructor(private readonly conversationsService: ConversationsService) {}

  @Get()
  async getAll(@User("userId") userId: string) {
    return this.conversationsService.getAll(userId);
  }

  @Post("create")
  async create(@Body() body: CreateConversationDto) {
    return this.conversationsService.create(body);
  }

  @Delete("delete/:id")
  async delete(@Param("id") id: string) {
    return this.conversationsService.delete(id);
  }
}
