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

  @Column({
    default: true,
  })
  likes: boolean;

  @Column({
    default: true,
  })
  followers: boolean;

  @Column({
    default: true,
  })
  comments: boolean;

  @Column({
    default: true,
  })
  friendRequests: boolean;

  @Column({
    default: true,
  })
  birthdays: boolean;

  @Column({
    default: true,
  })
  events: boolean;

  @Column({
    default: true,
  })
  groups: boolean;

  @Column({
    default: true,
  })
  messages: boolean;

  @OneToOne(() => User, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  user: User;
}
