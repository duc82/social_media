import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Conversation } from "./conversation.entity";
import { MessageFile } from "./message_file.entity";
import { User } from "src/users/entities/user.entity";

@Entity({
  name: "conversation_messages",
})
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  content: string;

  @Column({
    default: false,
  })
  seen: boolean;

  @ManyToOne(() => Conversation, (conversation) => conversation.messages, {
    onDelete: "CASCADE",
  })
  conversation: Conversation;

  @OneToMany(() => MessageFile, (file) => file.message, {
    cascade: true,
  })
  files: MessageFile[];

  @ManyToOne(() => User, (user) => user.messages, {
    onDelete: "CASCADE",
  })
  user: User;

  @CreateDateColumn()
  createdAt: Date;
}
