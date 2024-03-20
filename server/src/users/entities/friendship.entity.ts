import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { FriendshipStatus } from "../interfaces/friendship.interface";
import { User } from "./user.entity";

@Entity()
export class FriendShip {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @ManyToOne(() => User, (user) => user.id)
  friend: User;

  @Column({
    type: "enum",
    enum: FriendshipStatus,
    default: FriendshipStatus.PENDING,
  })
  status: FriendshipStatus;
}
