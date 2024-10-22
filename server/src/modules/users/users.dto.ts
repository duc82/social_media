import {
  IsEmail,
  IsNotEmpty,
  IsEnum,
  MinLength,
  IsDateString,
  ValidateIf,
  IsString,
  IsOptional,
  Matches,
} from "class-validator";
import { Gender, MaritalStatus } from "./enums/profiles.enum";
import { OmitType } from "@nestjs/swagger";
import { Transform } from "class-transformer";

export class ProfileDto {
  @ValidateIf((o) => o.gender)
  @IsEnum(Gender)
  gender?: Gender;

  @ValidateIf((o) => o.avatar)
  @IsString()
  avatar?: string;

  @ValidateIf((o) => o.wallpaper)
  @IsString()
  wallpaper?: string;

  @ValidateIf((o) => o.birthday)
  @IsDateString()
  birthday?: string;

  @ValidateIf((o) => o.status)
  @IsEnum(MaritalStatus)
  maritalStatus?: MaritalStatus;

  @ValidateIf((o) => o.job)
  @IsString()
  job?: string;

  @ValidateIf((o) => o.address)
  @IsString()
  address?: string;

  @ValidateIf((o) => o.overview)
  @IsString()
  bio?: string;

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
  firstName: string;

  @MinLength(2)
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  email: string;

  @MinLength(8)
  @IsNotEmpty()
  password: string;

  @IsOptional()
  emailVerified?: Date;

  profile: ProfileDto;
}

export class UpdateUserDto extends OmitType(ProfileDto, [
  "avatar",
  "wallpaper",
]) {
  @ValidateIf((o) => o.firstName)
  @MinLength(2)
  firstName?: string;

  @ValidateIf((o) => o.lastName)
  @MinLength(2)
  lastName?: string;

  @ValidateIf((o) => o.username)
  @MinLength(2)
  @Matches(/^[a-zA-Z0-9]*$/, {
    message: "Username must contain only letters, numbers",
  })
  username?: string;

  @ValidateIf((o) => o.offlineAt)
  @IsDateString()
  offlineAt?: Date;

  @ValidateIf((o) => o.isAvatar)
  @Transform(({ value }) => value === "true" || value === true)
  isAvatar?: boolean;
}

export class ChangePasswordDto {
  @IsNotEmpty()
  currentPassword: string;

  @MinLength(8)
  @IsNotEmpty()
  newPassword: string;
}
