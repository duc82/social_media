import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "../users/entities/users.entity";
import { FileType } from "src/enums/file.enum";

@Entity({
  name: "stories",
})
export class Story extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false })
  content: string;

  @Column({ type: "enum", enum: FileType })
  type: FileType;

  @ManyToOne(() => User, (user) => user.stories, {
    onDelete: "CASCADE",
  })
  user: User;

  @Column({
    type: "timestamptz",
    default: () => "CURRENT_TIMESTAMP + interval '24 hours'",
  })
  expiresAt: Date;

  @DeleteDateColumn({ type: "timestamptz", name: "deletedAt" })
  deletedAt: Date;

  @CreateDateColumn({
    type: "timestamptz",
  })
  createdAt: Date;
}
