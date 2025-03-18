import { User } from "src/modules/users/entities/users.entity";
import { Comment } from "src/modules/posts/entities/comments.entity";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Post } from "../../posts/entities/posts.entity";
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
  @ManyToOne(() => User, { nullable: true, onDelete: "CASCADE" })
  user: User;

  // who made the action
  @ManyToOne(() => User, { nullable: true, onDelete: "CASCADE" })
  actor: User;

  @ManyToOne(() => Post, { nullable: true, onDelete: "CASCADE" })
  post: Post;

  @ManyToOne(() => Comment, { nullable: true, onDelete: "CASCADE" })
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

  @DeleteDateColumn({
    type: "timestamptz",
  })
  deletedAt: Date;

  @CreateDateColumn({
    type: "timestamptz",
  })
  createdAt: Date;
}
