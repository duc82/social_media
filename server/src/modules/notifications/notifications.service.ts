import { Injectable, NotFoundException } from "@nestjs/common";
import { DataSource, Not } from "typeorm";
import { User } from "../users/entities/users.entity";
import { NotificationSettings } from "./entities/notification_settings.entity";
import { CreateNotificationDto } from "./notifications.dto";
import { Notification } from "./entities/notifications.entity";

@Injectable()
export class NotificationsService {
  public readonly notificationRepository =
    this.dataSource.getRepository(Notification);
  public readonly notificationSettingsRepository =
    this.dataSource.getRepository(NotificationSettings);

  constructor(private readonly dataSource: DataSource) {}

  async createSettings(userId: string) {
    const settings = this.dataSource
      .getRepository(NotificationSettings)
      .create({
        user: { id: userId },
      });

    await this.dataSource.getRepository(NotificationSettings).save(settings);

    return settings;
  }

  async getOrCreateSettings(userId: string) {
    const settings = await this.notificationSettingsRepository.findOne({
      where: { user: { id: userId } },
    });

    if (settings) {
      return settings;
    }

    const newSettings = await this.createSettings(userId);

    return newSettings;
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

  async updateSettings(userId: string, data: Partial<NotificationSettings>) {
    const settings = await this.notificationSettingsRepository.findOne({
      where: { user: { id: userId } },
    });

    if (!settings) {
      throw new NotFoundException("Settings not found");
    }

    Object.assign(settings, data);

    await this.notificationSettingsRepository.save(settings);

    return settings;
  }
}
