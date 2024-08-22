import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Message } from "src/modules/messages/entities/messages.entity";
import { ConversationMember } from "./conversation_members.entity";

@Entity({
  name: "conversations",
})
export class Conversation extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    nullable: true,
  })
  name: string;

  @Column({
    nullable: true,
  })
  image: string;

  @Column()
  isGroup: boolean;

  @DeleteDateColumn({ type: "timestamptz", name: "deletedAt" })
  deletedAt: Date;

  @OneToMany(() => Message, (message) => message.conversation, {
    cascade: true,
  })
  messages: Message[];

  @OneToMany(() => ConversationMember, (member) => member.conversation, {
    cascade: true,
  })
  members: ConversationMember[];

  @CreateDateColumn({
    type: "timestamptz",
  })
  createdAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  setIsGroup() {
    this.isGroup = this.members.length > 2 ? true : false;
  }
}
