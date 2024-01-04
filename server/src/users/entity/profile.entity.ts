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
    nullable: true,
  })
  gender: Gender;

  @Column()
  avatar: string;

  @Column()
  wallpaper: string;

  @Column({
    type: "date",
    nullable: true,
  })
  bornAt: Date;

  @Column({
    type: "enum",
    enum: Status,
    nullable: true,
  })
  status: Status;

  @Column({
    nullable: true,
  })
  address: string;

  @Column({
    nullable: true,
  })
  overview: string;

  @OneToOne(() => User, (user) => user.profile)
  user: User;
}
