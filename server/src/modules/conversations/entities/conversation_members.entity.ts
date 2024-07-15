import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Conversation } from "./conversations.entity";
import { User } from "src/modules/users/entities/users.entity";
import { MemberRole } from "src/enums/role.enum";

@Entity({
  name: "conversation_members",
})
export class ConversationMember extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Conversation, (conversation) => conversation.members, {
    onDelete: "CASCADE",
  })
  conversation: Conversation;

  @ManyToOne(() => User, (user) => user.conversations, {
    onDelete: "CASCADE",
  })
  user: User;

  @Column({
    type: "enum",
    enum: MemberRole,
    default: MemberRole.MEMBER,
  })
  role: MemberRole;

  @Column({
    default: false,
  })
  isRead: boolean;

  @CreateDateColumn({
    type: "timestamptz",
  })
  createdAt: Date;
}
