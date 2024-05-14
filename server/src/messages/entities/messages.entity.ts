import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MessageFile } from "./message_files.entity";
import { User } from "src/users/entities/users.entity";
import { Conversation } from "src/conversations/entities/conversations.entity";

@Entity({
  name: "messages",
})
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    nullable: true,
  })
  content?: string;

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
