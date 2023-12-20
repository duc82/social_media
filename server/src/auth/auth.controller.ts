import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from "./auth.guard";
import { SignInDto, SignUpDto } from "./auth.dto";
import { Request } from "express";
import { Role } from "src/users/entity/user.entity";

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

  @UseGuards(AuthGuard)
  @Get("profile")
  async getProfile(
    @Req() req: Request & { user: { userId: string; role: Role } },
  ) {
    return this.authService.getProfile(req.user.userId);
  }
}
