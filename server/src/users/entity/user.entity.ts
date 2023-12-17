import * as bcrypt from "bcrypt";
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Profile } from "./profile.entity";
import { Exclude } from "class-transformer";

export enum Role {
  USER = "user",
  ADMIN = "admin",
}

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  fullName: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({
    type: "enum",
    enum: Role,
    default: Role.USER,
  })
  role: Role;

  @OneToOne(() => Profile, (profile) => profile.user, {
    cascade: true,
  })
  @JoinColumn()
  profile: Profile;

  @CreateDateColumn()
  createdAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (!this.password) {
      return;
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return await bcrypt.compare(attempt, this.password);
  }

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
