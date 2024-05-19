import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Message } from "src/messages/entities/messages.entity";
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

  @Index("is_group_index")
  @Column()
  isGroup: boolean;

  @Index("is_deleted_index")
  @Column({
    default: false,
  })
  isDeleted: boolean;

  @OneToMany(() => Message, (message) => message.conversation, {
    cascade: true,
  })
  messages: Message[];

  @OneToMany(() => ConversationMember, (member) => member.conversation, {
    cascade: true,
  })
  members: ConversationMember[];

  @CreateDateColumn()
  createdAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  setIsGroup() {
    this.isGroup = this.members.length > 2 ? true : false;
  }
}
