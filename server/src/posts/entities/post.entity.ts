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
import { PostFile } from "./post_file.entity";

export enum Audience {
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
    enum: Audience,
    default: Audience.PUBLIC,
  })
  audience: Audience;

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

  @CreateDateColumn()
  createdAt: Date;
}
