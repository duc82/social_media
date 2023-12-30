import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

export enum Gender {
  MALE = "male",
  FEMALE = "female",
  OTHER = "other",
}

export enum Status {
  SINGLE = "single",
  MARRIED = "married",
}

@Entity()
export class Profile {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "enum",
    enum: Gender,
  })
  gender: Gender;

  @Column()
  avatar: string;

  @Column({
    type: "date",
  })
  bornAt: Date;

  @Column({
    type: "enum",
    enum: Status,
  })
  status: Status;

  @Column()
  address: string;

  @Column()
  info: string;

  @OneToOne(() => User, (user) => user.profile, {
    onDelete: "CASCADE",
  })
  user: User;
}
