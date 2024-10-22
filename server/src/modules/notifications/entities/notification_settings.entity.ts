import { User } from "src/modules/users/entities/users.entity";
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity({
  name: "notification_settings",
})
export class NotificationSettings extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User; // The user who the settings belong to

  // The settings for the user
  @Column({
    default: true,
  })
  likes: boolean; // Whether the user wants to receive notifications for likes

  @Column({
    default: true,
  })
  comments: boolean; // Whether the user wants to receive notifications for comments

  @Column({
    default: true,
  })
  friendRequests: boolean; // Whether the user wants to receive notifications for friend requests

  @Column({
    default: true,
  })
  birthdays: boolean; // Whether the user wants to receive notifications for birthdays

  @Column({
    default: true,
  })
  events: boolean; // Whether the user wants to receive notifications for events

  @Column({
    default: true,
  })
  groups: boolean; // Whether the user wants to receive notifications for groups

  @Column({
    default: true,
  })
  messages: boolean; // Whether the user wants to receive notifications for messages
}
