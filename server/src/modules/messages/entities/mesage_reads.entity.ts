import { User } from "src/modules/users/entities/users.entity";
import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Message } from "./messages.entity";

@Entity({
  name: "message_reads",
})
export class MessageRead extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Index("idx_message_reads_user_id")
  @ManyToOne(() => User, (user) => user.id, {
    onDelete: "CASCADE",
  })
  user: User;

  @Index("idx_message_reads_message_id")
  @ManyToOne(() => Message, (message) => message.reads, {
    onDelete: "CASCADE",
  })
  message: Message;

  @CreateDateColumn({ type: "timestamptz" })
  createdAt: Date;
}
