import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CallStatus, CallType } from "../enums/calls.enum";
import { User } from "src/modules/users/entities/users.entity";

@Entity({
  name: "calls",
})
export class Call extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "enum",
    enum: CallType,
  })
  type: CallType;

  @Column({ nullable: true })
  duration: number;

  @Column({
    type: "enum",
    enum: CallStatus,
  })
  status: CallStatus;

  @ManyToOne(() => User, (user) => user.callers, { onDelete: "CASCADE" })
  caller: User;

  @ManyToOne(() => User, (user) => user.callees, { onDelete: "CASCADE" })
  callee: User;

  @DeleteDateColumn({
    type: "timestamptz",
    name: "deletedAt",
  })
  deletedAt: Date;

  @CreateDateColumn({
    type: "timestamptz",
  })
  createdAt: Date;
}
