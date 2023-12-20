import { OmitType } from "@nestjs/swagger";
import { CreateUserDto } from "src/users/user.dto";

export class SignUpDto extends CreateUserDto {}
export class SignInDto extends OmitType(CreateUserDto, ["fullName"] as const) {}
