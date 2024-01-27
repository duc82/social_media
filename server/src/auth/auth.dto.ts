import { OmitType } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { CreateUserDto } from "src/users/users.dto";

export class SignUpDto extends CreateUserDto {}

export class SignInDto extends OmitType(CreateUserDto, [
  "fullName",
  "password",
] as const) {
  @IsNotEmpty()
  password: string;
}
