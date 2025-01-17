import { User } from "src/modules/users/entities/users.entity";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { FriendStatus } from "./friends.enum";

@Entity({
  name: "friends",
})
export class Friend extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User, (user) => user.id, {
    onDelete: "CASCADE",
  })
  user: User;

  @ManyToOne(() => User, (user) => user.id, {
    onDelete: "CASCADE",
  })
  friend: User;

  @Column({
    type: "enum",
    enum: FriendStatus,
    default: FriendStatus.PENDING,
  })
  status: FriendStatus;

  @CreateDateColumn({
    type: "timestamptz",
  })
  createdAt: Date;
}
