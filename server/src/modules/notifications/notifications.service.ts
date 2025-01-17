import { Injectable, NotFoundException } from "@nestjs/common";
import { DataSource } from "typeorm";
import { User } from "../users/entities/users.entity";
import { NotificationSettings } from "./entities/notification_settings.entity";

@Injectable()
export class NotificationsService {
  constructor(private readonly dataSource: DataSource) {}

  async getOrCreateSettings(userId: string) {
    const user = await this.dataSource.getRepository(User).findOne({
      where: { id: userId },
      relations: ["notificationSettings"],
      select: ["notificationSettings"],
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    if (user.notificationSettings) {
      return user.notificationSettings;
    }

    const settings = new NotificationSettings();
    user.notificationSettings = settings;

    await this.dataSource.getRepository(User).save(user);

    return settings;
  }
}
