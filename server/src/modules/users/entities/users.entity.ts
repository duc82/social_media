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
  fullName: string;

  @Index("idx_email_users", { unique: true })
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
  bannedAt: Date;

  @Column({
    nullable: true,
    type: "timestamptz",
  })
  deletedAt: Date;

  @CreateDateColumn({
    type: "timestamptz",
  })
  createdAt: Date;

  softDelete() {
    this.deletedAt = new Date();
    this.email = `${this.email}-deleted-${this.id}`;
  }

  restore() {
    this.deletedAt = null;
    this.email = this.email.replace(/-deleted-[0-9a-f-]+$/, "");
  }

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
