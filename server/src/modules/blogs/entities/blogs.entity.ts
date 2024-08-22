import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BlogTag } from "./blog_tags.entity";

@Entity({
  name: "blogs",
})
export class Blog extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  image: string;

  @ManyToOne(() => BlogTag, {
    onDelete: "CASCADE",
  })
  tag: BlogTag;

  @DeleteDateColumn({
    type: "timestamptz",
  })
  deletedAt: Date;

  @CreateDateColumn({
    type: "timestamptz",
  })
  createdAt: Date;
}
