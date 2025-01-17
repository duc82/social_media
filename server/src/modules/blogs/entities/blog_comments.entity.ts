import { User } from "src/modules/users/entities/users.entity";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity({
  name: "blog_comments",
})
export class BlogComment extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  content: string;

  @ManyToOne(() => User, {
    onDelete: "CASCADE",
  })
  user: User;

  @OneToMany(() => BlogComment, (blogComment) => blogComment.replies)
  replies: BlogComment[];

  @CreateDateColumn({
    type: "timestamptz",
  })
  createdAt: Date;
}
