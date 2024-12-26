import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { GroupAccess } from "../groups.interface";
import { GroupMember } from "./group_members.entity";
import { Post } from "src/modules/posts/entities/posts.entity";

@Entity({
  name: "groups",
})
export class Group extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({
    nullable: true,
  })
  description: string;

  @Column()
  picture: string;

  @Column()
  wallpaper: string;

  @Column({
    type: "enum",
    enum: GroupAccess,
  })
  access: GroupAccess;

  @OneToMany(() => GroupMember, (member) => member.group, {
    cascade: true,
  })
  members: GroupMember[];

  @OneToMany(() => Post, (post) => post.group, {
    cascade: true,
  })
  posts: Post[];

  @DeleteDateColumn({ type: "timestamptz" })
  deletedAt: Date;

  @CreateDateColumn({
    type: "timestamptz",
  })
  createdAt: Date;
}
