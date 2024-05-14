import { User } from "src/users/entities/users.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Post } from "./posts.entity";

@Entity({
  name: "comments",
})
export class Comment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  content: string;

  @ManyToMany(() => User)
  @JoinTable()
  likes: User[];

  @ManyToOne(() => User, (user) => user.comments, {
    onDelete: "CASCADE",
  })
  user: User;

  @ManyToOne(() => Post, (post) => post.comments, {
    onDelete: "CASCADE",
  })
  post: Post;

  @OneToMany(() => Comment, (comment) => comment.replies)
  replies: Comment[];

  @CreateDateColumn()
  createdAt: Date;
}
