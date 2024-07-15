import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
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

  @ManyToOne(() => User, (user) => user.blockedUsers, {
    onDelete: "CASCADE",
  })
  user: User;

  @CreateDateColumn({
    type: "timestamptz",
  })
  createdAt: Date;
}
