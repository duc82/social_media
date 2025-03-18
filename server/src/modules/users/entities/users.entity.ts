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
  JoinTable,
  ManyToMany,
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
import { UserRole } from "../enums/users.enum";
import { Blocked } from "./blocked.entity";
import { Story } from "src/modules/stories/stories.entity";
import { Call } from "src/modules/messages/entities/calls.entity";
import { Message } from "src/modules/messages/entities/messages.entity";
import { NotificationSettings } from "src/modules/notifications/entities/notification_settings.entity";
import { Notification } from "src/modules/notifications/entities/notifications.entity";

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

  @Column()
  fullName: string;

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

  @OneToMany(() => Blocked, (blocked) => blocked.user, {
    cascade: true,
  })
  blocked: Blocked[];

  @OneToMany(() => Blocked, (blocked) => blocked.blockedBy, {
    cascade: true,
  })
  blockedBy: Blocked[];

  @OneToOne(() => Profile, {
    eager: true,
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

  @OneToMany(() => Notification, (notification) => notification.user, {
    cascade: true,
  })
  notifications: Notification[];

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

  @OneToMany(() => Story, (story) => story.user, {
    cascade: true,
  })
  stories: Story[];

  @OneToMany(() => Message, (message) => message.user, {
    cascade: true,
  })
  messages: Message[];

  @OneToMany(() => Call, (call) => call.caller, { cascade: true })
  callers: Call[];

  @OneToMany(() => Call, (call) => call.callee, { cascade: true })
  callees: Call[];

  @ManyToMany(() => User, (user) => user.followers)
  @JoinTable({
    name: "followers",
    joinColumn: { name: "followerId", referencedColumnName: "id" },
    inverseJoinColumn: { name: "followingId", referencedColumnName: "id" },
  })
  following: User[];

  @ManyToMany(() => User, (user) => user.following)
  followers: User[];

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
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (!this.password) {
      return;
    }
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }

  @BeforeInsert()
  async generateUsernameAndFullname(): Promise<void> {
    this.username = this.email.split("@")[0];
    this.fullName = this.firstName + " " + this.lastName;
  }

  @BeforeUpdate()
  async generateFullname(): Promise<void> {
    if (this.firstName || this.lastName) {
      this.fullName = this.firstName + " " + this.lastName;
    }
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return await bcrypt.compare(attempt, this.password);
  }
}
