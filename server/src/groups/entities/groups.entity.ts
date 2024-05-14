import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { GroupAccess } from "../groups.interface";
import { GroupMember } from "./group_members.entity";

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
  about: string;

  @Column({
    type: "enum",
    enum: GroupAccess,
  })
  access: GroupAccess;

  @OneToMany(() => GroupMember, (member) => member.group, {
    cascade: true,
  })
  members: GroupMember[];

  @CreateDateColumn()
  createdAt: Date;
}
