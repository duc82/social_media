import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Group } from "./groups.entity";
import { User } from "src/users/entities/users.entity";
import { MemberRole } from "src/interfaces/roles.interface";

@Entity({
  name: "group_members",
})
export class GroupMember extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Group, (group) => group.members, {
    onDelete: "CASCADE",
  })
  group: Group;

  @ManyToOne(() => User, (user) => user.groups, {
    onDelete: "CASCADE",
  })
  user: User;

  @Column({
    type: "enum",
    enum: MemberRole,
    default: MemberRole.MEMBER,
  })
  role: MemberRole;

  @CreateDateColumn({
    type: "timestamptz",
  })
  createdAt: Date;
}
