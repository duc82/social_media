import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { FriendshipStatus } from "../interfaces/friendship.interface";
import { User } from "./user.entity";

@Entity({
  name: "friendships",
})
export class FriendShip extends BaseEntity {
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
    enum: FriendshipStatus,
    default: FriendshipStatus.PENDING,
  })
  status: FriendshipStatus;
}
