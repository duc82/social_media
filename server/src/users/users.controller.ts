import { Url } from "./../url/url.decorator";
import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UpdateUserProfileDto } from "./users.dto";
import { AuthGuard } from "src/auth/auth.guard";
import { User } from "./users.decorator";

@UseGuards(AuthGuard)
@Controller("api/users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get("profile")
  async getUserProfile(@User("userId") userId: string) {
    return this.usersService.getUserProfile(userId);
  }

  @Post("profile/update")
  async updateUserProfile(
    @User("userId") userId: string,
    @Url() url: string,
    @Body() body: UpdateUserProfileDto,
  ) {
    return this.usersService.updateUserProfile(userId, body, url);
  }
}
