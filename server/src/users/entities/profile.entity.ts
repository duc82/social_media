import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Gender, MarialStatus } from "../interfaces/profile.interface";

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

  @Column({
    nullable: true,
  })
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

  @Column({
    nullable: true,
  })
  location: string;
}
