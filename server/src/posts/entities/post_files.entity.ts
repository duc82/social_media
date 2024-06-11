import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Post } from "./posts.entity";
import { FileType } from "src/interfaces/files.interface";

@Entity({
  name: "post_files",
})
export class PostFile {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  url: string;

  @Column({
    type: "enum",
    enum: FileType,
  })
  type: FileType;

  @ManyToOne(() => Post, (post) => post.files, {
    onDelete: "CASCADE",
  })
  post: Post;

  @CreateDateColumn({
    type: "timestamptz",
  })
  createdAt: Date;
}
