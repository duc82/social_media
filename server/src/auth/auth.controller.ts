import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseInterceptors,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignInDto, SignUpDto } from "./auth.dto";

@Controller("api/auth")
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signup")
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() body: SignUpDto) {
    return this.authService.signUp(body);
  }

  @Post("signin")
  @HttpCode(HttpStatus.OK)
  async signin(@Body() body: SignInDto) {
    return this.authService.signIn(body);
  }
}
