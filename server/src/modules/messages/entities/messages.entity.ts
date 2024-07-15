import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MessageFile } from "./message_files.entity";
import { User } from "src/modules/users/entities/users.entity";
import { Conversation } from "src/modules/conversations/entities/conversations.entity";
import { MessageRead } from "./mesage_reads.entity";

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

  @OneToMany(() => MessageRead, (view) => view.message)
  reads: MessageRead[];

  @Column({ nullable: true, type: "timestamptz" })
  offlineAt: Date;

  @Column({
    nullable: true,
    type: "timestamptz",
  })
  deletedAt: Date;

  @CreateDateColumn({
    type: "timestamptz",
  })
  createdAt: Date;
}
