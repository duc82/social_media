import { IsEmail, IsNotEmpty, IsEnum, MinLength } from "class-validator";
import { Gender, Status } from "./entity/profile.entity";

export class CreateUserDto {
  @MinLength(2)
  @IsNotEmpty()
  fullName: string;

  @IsEmail()
  email: string;

  @MinLength(8)
  @IsNotEmpty()
  password: string;
}

export class UpdateUserProfileDto {
  @IsEnum(Gender)
  gender: Gender;

  @IsNotEmpty()
  avatar: string;

  @IsNotEmpty()
  bornAt: Date;

  @IsEnum(Status)
  status: Status;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  info: string;
}
