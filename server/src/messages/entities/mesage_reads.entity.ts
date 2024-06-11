import { User } from "src/users/entities/users.entity";
import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Message } from "./messages.entity";

@Entity({
  name: "message_views",
})
export class MessageRead extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User, (user) => user.id, {
    onDelete: "CASCADE",
  })
  user: User;

  @ManyToOne(() => Message, (message) => message.reads)
  message: Message;

  @CreateDateColumn({ type: "timestamptz" })
  createdAt: Date;
}
