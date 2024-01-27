import { Url } from "./../url/url.decorator";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { AuthGuard } from "src/auth/auth.guard";
import { User } from "./users.decorator";
import { ProfileDto } from "./users.dto";

@Controller("api/users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get("profile")
  async getUserProfile(@User("userId") userId: string) {
    return this.usersService.getUserProfile(userId);
  }

  @UseGuards(AuthGuard)
  @Post("profile/update")
  async updateUserProfile(
    @User("userId") userId: string,
    @Url() url: string,
    @Body() profile: ProfileDto,
  ) {
    return this.usersService.updateUserProfile(userId, profile, url);
  }

  @Delete("delete/:id")
  async deleteUser(@Param("id") id: string) {
    return this.usersService.delete(id);
  }
}
