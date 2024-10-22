import { Friend } from "src/modules/friends/friends.entity";
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

@Entity({
  name: "notifications",
})
export class Notification extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  content: string; // The content of the notification

  @ManyToOne(() => User, { nullable: true })
  actor: User; // The user who triggered the notification

  @ManyToOne(() => User)
  user: User; // The user who will receive the notification

  @ManyToOne(() => Post, { nullable: true })
  post: Post; // The post that the notification is about

  @ManyToOne(() => Friend)
  friend: Friend; // The friend that the notification is about

  @ManyToOne(() => Comment)
  comment: Comment; // The comment that the notification is about

  @Column()
  type: string; // The type of the notification

  @Column({
    nullable: true,
    type: "timestamptz",
  })
  readAt: Date; // The time the user read the notification

  @DeleteDateColumn({
    type: "timestamptz",
  })
  deletedAt: Date;

  @CreateDateColumn({
    type: "timestamptz",
  })
  createdAt: Date;
}
