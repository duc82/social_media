import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity({
  name: "tokens",
})
export class Token extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    nullable: true,
  })
  resetToken: string;

  @Column({
    nullable: true,
    type: "timestamptz",
  })
  resetTokenExpires: Date;

  @CreateDateColumn({
    type: "timestamptz",
  })
  createdAt: Date;
}
