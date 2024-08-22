import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Gender, MaritalStatus } from "../enums/profiles.enum";

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
    enum: MaritalStatus,
    nullable: true,
  })
  maritalStatus: MaritalStatus;

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
    length: 300,
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
