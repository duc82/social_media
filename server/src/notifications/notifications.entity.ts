import { User } from "src/users/entities/users.entity";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity({
  name: "notifications",
})
export class Notification extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(() => User)
  user: User;

  @Column()
  isRead: boolean;

  @CreateDateColumn({
    type: "timestamptz",
  })
  createdAt: Date;
}
