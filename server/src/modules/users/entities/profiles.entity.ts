import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Gender, MarialStatus } from "../enums/profiles.enum";

@Entity({
  name: "profiles",
})
export class Profile extends BaseEntity {
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
    nullable: true,
  })
  wallpaper: string;

  @Column({
    type: "date",
  })
  birthday: string;

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
  bio: string;

  @Column({
    nullable: true,
  })
  education: string;

  @Column({
    nullable: true,
  })
  workplace: string;
}
