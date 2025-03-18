import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { NotificationsService } from "./notifications.service";
import { User } from "src/common/decorators/user.decorator";
import { AuthGuard } from "src/common/guards/auth.guard";
import { NotificationSettings } from "./entities/notification_settings.entity";

@UseGuards(AuthGuard)
@Controller("api/notifications")
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get("settings")
  async getSettings(@User("userId") userId: string) {
    return this.notificationsService.getOrCreateSettings(userId);
  }

  @Post("update/settings")
  async updateSettings(
    @User("userId") userId: string,
    @Body() data: Partial<NotificationSettings>,
  ) {
    return this.notificationsService.updateSettings(userId, data);
  }
}
