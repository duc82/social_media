import * as bcrypt from "bcrypt";
import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Profile } from "./profiles.entity";
import { Exclude } from "class-transformer";
import { Post } from "src/modules/posts/entities/posts.entity";
import { Token } from "./tokens.entity";
import { GroupMember } from "src/modules/groups/entities/group_members.entity";
import { ConversationMember } from "src/modules/conversations/entities/conversation_members.entity";
import { BlockedUser } from "./blocked_users.entity";
import { UserRole } from "../enums/users.enum";

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

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Index("idx_users_username", { unique: true })
  @Column()
  username: string;

  @Index("idx_users_email", { unique: true })
  @Column()
  email: string;

  @Column({
    nullable: true,
    type: "timestamptz",
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

  @Column({
    nullable: true,
    type: "timestamptz",
  })
  offlineAt: Date;

  @Column({
    nullable: true,
    type: "timestamptz",
  })
  bannedAt: Date;

  @DeleteDateColumn({
    type: "timestamptz",
    name: "deletedAt",
  })
  deletedAt: Date;

  @CreateDateColumn({
    type: "timestamptz",
  })
  createdAt: Date;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }

  @BeforeInsert()
  async generateUsername(): Promise<void> {
    this.username = this.email.split("@")[0];
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return await bcrypt.compare(attempt, this.password);
  }
}
