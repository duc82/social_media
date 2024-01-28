import * as bcrypt from "bcrypt";
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import { Profile } from "./profile.entity";
import { Exclude } from "class-transformer";
import { Post } from "src/posts/entity/post.entity";
import { Comment } from "src/posts/entity/comment.entity";

export enum Role {
  USER = "user",
  ADMIN = "admin",
}

@Entity()
@Index(["email"], { unique: true })
@Index(["fullName"])
@Unique(["email"])
export class User {
  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  fullName: string;

  @Column()
  email: string;

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

  @OneToMany(() => User, (user) => user.friends)
  friends: User[];

  @OneToMany(() => Post, (post) => post.user, {
    cascade: true,
  })
  posts: Post[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @ManyToMany(() => Post, (post) => post.likes)
  likedPosts: Post[];

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
