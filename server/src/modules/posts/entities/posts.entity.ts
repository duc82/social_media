import { User } from "src/modules/users/entities/users.entity";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Comment } from "./comments.entity";
import { PostFile } from "./post_files.entity";
import { PostAccess } from "../enums/posts.enum";
import { Group } from "src/modules/groups/entities/groups.entity";

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

  @Column("text", { array: true, nullable: true })
  feeling: string[];

  @Column("text", { array: true, nullable: true })
  activity: string[];

  @OneToMany(() => PostFile, (file) => file.post, {
    cascade: true,
  })
  files: PostFile[];

  @OneToMany(() => Comment, (comment) => comment.post, {
    cascade: true,
  })
  comments: Comment[];

  @ManyToOne(() => Group, (group) => group.posts, {
    onDelete: "CASCADE",
  })
  group: Group;

  @ManyToOne(() => User, (user) => user.posts, {
    onDelete: "CASCADE",
  })
  user: User;

  @ManyToMany(() => User)
  @JoinTable()
  likes: User[];

  @DeleteDateColumn({ type: "timestamptz", name: "deletedAt" })
  deletedAt: Date;

  @CreateDateColumn({
    type: "timestamptz",
  })
  createdAt: Date;
}
