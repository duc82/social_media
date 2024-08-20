import { Friend } from "src/modules/friends/friends.entity";
import { User } from "src/modules/users/entities/users.entity";
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

@Entity({
  name: "notifications",
})
export class Notification extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  image: string;

  @Column()
  description: string;

  @OneToOne(() => Friend, {
    cascade: true,
    onDelete: "CASCADE",
  })
  @JoinColumn()
  friend: Friend;

  @ManyToOne(() => User)
  user: User;

  @Column({
    nullable: true,
    type: "timestamptz",
  })
  readAt: Date;

  @DeleteDateColumn({
    type: "timestamptz",
  })
  deletedAt: Date;

  @CreateDateColumn({
    type: "timestamptz",
  })
  createdAt: Date;
}
