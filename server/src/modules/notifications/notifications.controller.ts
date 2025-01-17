import { Controller, Get, UseGuards } from "@nestjs/common";
import { NotificationsService } from "./notifications.service";
import { User } from "src/common/decorators/user.decorator";
import { AuthGuard } from "src/common/guards/auth.guard";

@UseGuards(AuthGuard)
@Controller("api/notifications")
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get("settings")
  async getSettings(@User("userId") userId: string) {
    return this.notificationsService.getOrCreateSettings(userId);
  }
}
