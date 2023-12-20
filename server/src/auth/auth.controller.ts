import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { CreateUserDto } from "src/users/user.dto";
import { AuthService } from "./auth.service";
import { AuthGuard } from "./auth.guard";
import { SignInDto } from "./auth.dto";
import { Request, Response } from "express";
import { Role } from "src/users/entity/user.entity";

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
  async signin(
    @Body() body: SignInDto,
    @Res({ passthrough: true }) res: Response, // passthrough: true to access res.cookie
  ) {
    return this.authService.signIn(body, res);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post("signout")
  async signOut(@Res() res: Response) {
    return this.authService.signOut(res);
  }

  @Post("refresh")
  @HttpCode(HttpStatus.OK)
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.refresh(req, res);
  }

  @UseGuards(AuthGuard)
  @Get("profile")
  async getProfile(
    @Req() req: Request & { user: { userId: string; role: Role } },
  ) {
    return this.authService.getProfile(req.user.userId);
  }
}
