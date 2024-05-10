import {
  IsEmail,
  IsNotEmpty,
  IsEnum,
  MinLength,
  IsDateString,
  ValidateIf,
  IsString,
  IsOptional,
} from "class-validator";
import { Gender, MarialStatus } from "../interfaces/profile.interface";

export class ProfileDto {
  @ValidateIf((o) => o.gender)
  @IsEnum(Gender)
  gender?: Gender;

  @ValidateIf((o) => o.avatar)
  @IsString()
  avatar: string;

  @ValidateIf((o) => o.wallpaper)
  @IsString()
  wallpaper?: string;

  @ValidateIf((o) => o.bornAt)
  @IsDateString()
  bornAt?: Date;

  @ValidateIf((o) => o.status)
  @IsEnum(MarialStatus)
  marialStatus?: MarialStatus;

  @ValidateIf((o) => o.job)
  @IsString()
  job?: string;

  @ValidateIf((o) => o.address)
  @IsString()
  address?: string;

  @ValidateIf((o) => o.overview)
  @IsString()
  overview?: string;

  @ValidateIf((o) => o.education)
  @IsString()
  education?: string;

  @ValidateIf((o) => o.workplace)
  @IsString()
  workplace?: string;
}

export class CreateUserDto {
  @MinLength(2)
  @IsNotEmpty()
  fullName: string;

  @IsEmail()
  email: string;

  @MinLength(8)
  @IsNotEmpty()
  password: string;

  @IsOptional()
  emailVerified?: Date;

  profile: ProfileDto;
}
