import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { CreateUserDto } from "src/users/user.dto";
import { AuthService } from "./auth.service";
import { AuthGuard } from "./auth.guard";
import { SignInDto } from "./auth.dto";

@Controller("api/auth")
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signup")
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() body: CreateUserDto) {
    return this.authService.signUp(body);
  }

  @Post("signin")
  @HttpCode(HttpStatus.OK)
  async signin(@Body() body: SignInDto) {
    return this.authService.signIn(body);
  }

  @UseGuards(AuthGuard)
  @Get("profile")
  async getProfile(@Request() req) {
    return this.authService.getProfile(req.user.userId);
  }
}
