import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Token {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    nullable: true,
  })
  resetToken: string;

  @Column({
    nullable: true,
  })
  resetTokenExpires: Date;

  @CreateDateColumn()
  createdAt: Date;
}
