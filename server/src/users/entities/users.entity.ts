import * as bcrypt from "bcrypt";
import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Profile } from "./profiles.entity";
import { Exclude } from "class-transformer";
import { Post } from "src/posts/entities/posts.entity";
import { Comment } from "src/posts/entities/comments.entity";
import { Token } from "./tokens.entity";
import { Message } from "src/messages/entities/messages.entity";
import { UserRole } from "src/interfaces/roles.interface";
import { GroupMember } from "src/groups/entities/group_members.entity";
import { ConversationMember } from "src/conversations/entities/conversation_members.entity";
import { BlockedUser } from "./blocked_users.entity";

@Entity({
  name: "users",
})
export class User extends BaseEntity {
  constructor(partial: Partial<User>) {
    super();
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Index("full_name_index")
  @Column()
  fullName: string;

  @Index("email_index", { unique: true })
  @Column()
  email: string;

  @Index("email_verified_index")
  @Column({
    nullable: true,
  })
  emailVerified: Date;

  @Column()
  @Exclude()
  password: string;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @Index("is_ban_index")
  @Column({
    default: false,
  })
  isBan: boolean;

  @OneToMany(() => BlockedUser, (blockerUser) => blockerUser.user)
  blockedUsers: BlockedUser[];

  @OneToOne(() => Profile, {
    cascade: true,
    onDelete: "CASCADE",
  })
  @JoinColumn()
  profile: Profile;

  @OneToOne(() => Token, {
    cascade: true,
    onDelete: "CASCADE",
  })
  @JoinColumn()
  token: Token;

  @OneToMany(() => GroupMember, (member) => member.user, {
    cascade: true,
  })
  groups: GroupMember[];

  @OneToMany(() => ConversationMember, (member) => member.user, {
    cascade: true,
  })
  conversations: ConversationMember[];

  @OneToMany(() => Post, (post) => post.user, {
    cascade: true,
  })
  posts: Post[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @OneToMany(() => Message, (message) => message.user, {
    cascade: true,
  })
  messages: Message[];

  @CreateDateColumn()
  createdAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (!this.password) {
      return;
    }

    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return await bcrypt.compare(attempt, this.password);
  }
}
