import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Post } from "./post.entity";

export enum FileType {
  IMAGE = "image",
  VIDEO = "video",
}

@Entity({
  name: "post_files",
})
export class File {
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

  @CreateDateColumn()
  createdAt: Date;
}
