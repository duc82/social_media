import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./users.entity";

@Entity({
  name: "blocked_users",
})
export class BlockedUser extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  blockedUserId: string;

  @ManyToOne(() => User, (user) => user.blockedUsers)
  user: User;

  @CreateDateColumn({
    type: "timestamptz",
  })
  createdAt: Date;
}
