import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

export enum Gender {
  MALE = "male",
  FEMALE = "female",
  OTHER = "other",
}

export enum MarialStatus {
  SINGLE = "single",
  MARRIED = "married",
  DIVORCED = "divorced",
  WIDOWED = "widowed",
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
    enum: MarialStatus,
    nullable: true,
  })
  marialStatus: MarialStatus;

  @Column({
    nullable: true,
  })
  job: string;

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
