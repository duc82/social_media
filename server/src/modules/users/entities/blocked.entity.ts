import {
  BaseEntity,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./users.entity";

@Entity({
  name: "blocked",
})
export class Blocked extends BaseEntity {
  constructor(partial: Partial<Blocked>) {
    super();
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User, (user) => user.blocked, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  user: User;

  @ManyToOne(() => User, (user) => user.blockedBy, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  blockedBy: User;
}
