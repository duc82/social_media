import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MessageFile } from "./message_files.entity";
import { User } from "src/modules/users/entities/users.entity";
import { Conversation } from "src/modules/conversations/entities/conversations.entity";
import { MessageRead } from "./mesage_reads.entity";
import { CallStatus } from "../enums/messages.enum";

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

  @Column({ nullable: true })
  isVideoCall: boolean;

  @Column({ nullable: true })
  isAudioCall: boolean;

  @Column({ nullable: true })
  callDuration: number;

  @Column({
    nullable: true,
    type: "enum",
    enum: CallStatus,
  })
  callStatus: CallStatus;

  @Index("idx_messages_conversation_id")
  @ManyToOne(() => Conversation, (conversation) => conversation.messages, {
    onDelete: "CASCADE",
  })
  conversation: Conversation;

  @OneToMany(() => MessageFile, (file) => file.message, {
    cascade: true,
  })
  files: MessageFile[];

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @OneToMany(() => MessageRead, (view) => view.message, {
    cascade: true,
  })
  reads: MessageRead[];

  @DeleteDateColumn({
    type: "timestamptz",
  })
  deletedAt: Date;

  @CreateDateColumn({
    type: "timestamptz",
  })
  createdAt: Date;
}
