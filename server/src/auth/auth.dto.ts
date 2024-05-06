import { OmitType } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";
import { CreateUserDto } from "src/users/dto/user.dto";

export class SignUpDto extends CreateUserDto {
  @IsNotEmpty()
  @IsString()
  avatar: string;
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
