import { User } from "src/users/entities/user.entity";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Comment } from "./comment.entity";
import { File } from "./file.entity";

export enum Audience {
  PUBLIC = "public",
  FRIENDS = "friends",
  PRIVATE = "private",
}

@Entity()
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string; // Completed

  @Column({ nullable: true })
  content: string; // Completed

  @Column({
    type: "enum",
    enum: Audience,
    default: Audience.PUBLIC,
  })
  audience: Audience; // Completed

  @OneToMany(() => File, (file) => file.post, {
    cascade: true,
  })
  files: File[]; // Completed

  @OneToMany(() => Comment, (comment) => comment.post, {
    cascade: true,
  })
  comments: Comment[]; // Completed

  @ManyToOne(() => User, (user) => user.posts, {
    onDelete: "CASCADE",
  })
  user: User; // Completed

  @ManyToMany(() => User, (user) => user.likedPosts)
  @JoinTable()
  likes: User[]; // Completed

  @CreateDateColumn()
  createdAt: Date; // Completed
}
