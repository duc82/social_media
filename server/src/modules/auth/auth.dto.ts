import { OmitType } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsDateString, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Gender } from "src/modules/users/enums/profiles.enum";
import { CreateUserDto } from "src/modules/users/users.dto";

export class SignUpDto extends CreateUserDto {
  @IsNotEmpty()
  @IsString()
  avatar: string;

  @IsEnum(Gender)
  gender: Gender;

  @IsDateString()
  birthday: string;
}

export class SignInDto extends OmitType(CreateUserDto, [
  "fullName",
  "password",
] as const) {
  @IsNotEmpty()
  password: string;

  @Transform(({ value }) => value === "true")
  isRemember: boolean;
}

export class RefreshDto {
  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}

export class ForgotPasswordDto {
  @IsNotEmpty()
  email: string;
}

export class ResetPasswordDto {
  @IsNotEmpty({
    message: "Token is required",
  })
  token: string;
  @IsNotEmpty({
    message: "Password is required",
  })
  password: string;
}