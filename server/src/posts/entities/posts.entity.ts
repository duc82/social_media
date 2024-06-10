import { User } from "src/users/entities/users.entity";
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
import { Comment } from "./comments.entity";
import { PostFile } from "./post_files.entity";

export enum PostAccess {
  PUBLIC = "public",
  FRIENDS = "friends",
  PRIVATE = "private",
}

@Entity({
  name: "posts",
})
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: true })
  content: string;

  @Column({
    type: "enum",
    enum: PostAccess,
    default: PostAccess.PUBLIC,
  })
  access: PostAccess;

  @Column({
    default: false,
  })
  isStory: boolean;

  @OneToMany(() => PostFile, (file) => file.post, {
    cascade: true,
  })
  files: PostFile[];

  @OneToMany(() => Comment, (comment) => comment.post, {
    cascade: true,
  })
  comments: Comment[];

  @ManyToOne(() => User, (user) => user.posts, {
    onDelete: "CASCADE",
  })
  user: User;

  @ManyToMany(() => User)
  @JoinTable()
  likes: User[];

  @Column({ nullable: true, type: "timestamptz" })
  deleteAt: Date;

  @CreateDateColumn({
    type: "timestamptz",
  })
  createdAt: Date;
}
