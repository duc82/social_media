import { OmitType } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { CreateUserDto } from "src/users/dto/user.dto";

export class SignUpDto extends CreateUserDto {}

export class SignInDto extends OmitType(CreateUserDto, [
  "fullName",
  "password",
] as const) {
  @IsNotEmpty()
  password: string;
  isRemember: boolean;
}

export class RefreshDto {
  @IsNotEmpty()
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
