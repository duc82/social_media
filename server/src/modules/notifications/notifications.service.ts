import { Injectable, NotFoundException } from "@nestjs/common";
import { DataSource } from "typeorm";
import { User } from "../users/entities/users.entity";
import { NotificationSettings } from "./entities/notification_settings.entity";
import { CreateNotificationDto } from "./notifications.dto";
import { Notification } from "./entities/notifications.entity";

@Injectable()
export class NotificationsService {
  public readonly notificationRepository =
    this.dataSource.getRepository(Notification);

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

  async create(data: CreateNotificationDto) {
    const notification = this.dataSource.getRepository(Notification).create({
      user: { id: data.userId },
      actor: data.actor,
      content: data.content,
      type: data.type,
      post: data.postId ? { id: data.postId } : null,
      comment: data.commentId ? { id: data.commentId } : null,
    });

    await this.dataSource.getRepository(Notification).save(notification);

    return notification;
  }
}
