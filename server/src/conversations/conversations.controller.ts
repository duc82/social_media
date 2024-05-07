import { Controller, Get } from "@nestjs/common";
import { ConversationsService } from "./conversations.service";
import { User } from "src/users/users.decorator";

@Controller("api/conversations")
export class ConversationsController {
  constructor(private readonly conversationsService: ConversationsService) {}

  @Get()
  async getAll(@User("userId") userId: string) {
    return this.conversationsService.getAll(userId);
  }
}
