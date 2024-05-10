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
  Unique,
} from "typeorm";
import { Profile } from "./profile.entity";
import { Exclude } from "class-transformer";
import { Post } from "src/posts/entities/post.entity";
import { Comment } from "src/posts/entities/comment.entity";
import { Token } from "./token.entity";
import { Role } from "../interfaces/user.interface";
import { Message } from "src/conversations/entities/message.entity";

@Entity({
  name: "users",
})
@Index(["email"], { unique: true })
@Index(["fullName"])
@Unique(["email"])
export class User extends BaseEntity {
  constructor(partial: Partial<User>) {
    super();
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  fullName: string;

  @Column()
  email: string;

  @Column({
    nullable: true,
  })
  emailVerified: Date;

  @Column()
  @Exclude()
  password: string;

  @Column({
    type: "enum",
    enum: Role,
    default: Role.USER,
  })
  role: Role;

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
