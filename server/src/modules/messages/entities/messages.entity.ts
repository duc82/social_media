import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MessageFile } from "./message_files.entity";
import { User } from "src/modules/users/entities/users.entity";
import { Conversation } from "src/modules/conversations/entities/conversations.entity";
import { MessageRead } from "./message_reads.entity";

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

  @Index("idx_messages_conversation_id")
  @ManyToOne(() => Conversation, (conversation) => conversation.messages, {
    onDelete: "CASCADE",
  })
  conversation: Conversation;

  @OneToMany(() => MessageFile, (file) => file.message, {
    cascade: true,
  })
  files: MessageFile[];

  @ManyToOne(() => User, (user) => user.id, {
    onDelete: "CASCADE",
  })
  user: User;

  @OneToMany(() => MessageRead, (view) => view.message, {
    cascade: true,
  })
  reads: MessageRead[];

  @DeleteDateColumn({
    type: "timestamptz",
    name: "deletedAt",
  })
  deletedAt: Date;

  @CreateDateColumn({
    type: "timestamptz",
  })
  createdAt: Date;
}
