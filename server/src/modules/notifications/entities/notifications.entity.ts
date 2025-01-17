import { User } from "src/modules/users/entities/users.entity";
import { Comment } from "src/modules/posts/entities/comments.entity";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Post } from "../../posts/entities/posts.entity";
import { NotificationSettings } from "./notification_settings.entity";
import { NotificationType } from "../enums/notifications.enum";

@Entity({
  name: "notifications",
})
export class Notification extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  content: string;

  // who gets the notification
  @ManyToOne(() => User, { nullable: true })
  user: User;

  // who made the action
  @ManyToOne(() => User, { nullable: true })
  actor: User;

  @ManyToOne(() => Post, { nullable: true })
  post: Post;

  @ManyToOne(() => Comment)
  comment: Comment;

  @Column({
    type: "enum",
    enum: NotificationType,
  })
  type: NotificationType;

  @Column({
    nullable: true,
    type: "timestamptz",
  })
  readAt: Date;

  @OneToOne(() => NotificationSettings, {
    cascade: true,
    onDelete: "CASCADE",
  })
  @JoinColumn()
  settings: NotificationSettings;

  @DeleteDateColumn({
    type: "timestamptz",
  })
  deletedAt: Date;

  @CreateDateColumn({
    type: "timestamptz",
  })
  createdAt: Date;
}
