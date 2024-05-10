import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Message } from "./message.entity";
import { User } from "src/users/entities/user.entity";

@Entity({
  name: "conversations",
})
export class Conversation extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    nullable: true,
  })
  name: string;

  @Column()
  isGroup: boolean;

  @OneToMany(() => Message, (message) => message.conversation, {
    cascade: true,
  })
  messages: Message[];

  @ManyToMany(() => User, {
    cascade: true,
  })
  @JoinTable()
  users: User[];

  @CreateDateColumn()
  createdAt: Date;
}
