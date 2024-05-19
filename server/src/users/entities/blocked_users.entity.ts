import {
  BaseEntity,
  Column,
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

  @Index("blocked_user_index")
  @Column()
  blockedUserId: string;

  @Index("blocker_user_index")
  @ManyToOne(() => User, (user) => user.blockedUsers)
  user: User;
}
