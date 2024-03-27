import { Url } from "../url/url.decorator";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { UserService } from "./users.service";
import { AuthGuard } from "src/auth/auth.guard";
import { User } from "./users.decorator";
import { ListFriendsDto, ProfileDto } from "./dto/user.dto";
import { QueryDto } from "src/dto/query.dto";

@Controller("api/users")
export class UsersController {
  constructor(private readonly usersService: UserService) {}

  @Get()
  async getAllUsers(@Query() query: QueryDto) {
    return this.usersService.getAll(query);
  }

  @Get(":id/profile")
  async getUserProfile(@Param("id") userId: string) {
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

  @Get("friends")
  async getFriends(@Query() query: ListFriendsDto) {
    return this.usersService.getFriends(query);
  }

  @UseGuards(AuthGuard)
  @Post("friends/request")
  async sendFriendRequest(
    @User("userId") userId: string,
    @Body("id") friendId: string,
  ) {
    return this.usersService.sendFriendRequest(userId, friendId);
  }

  @UseGuards(AuthGuard)
  @Post("friends/accept")
  async acceptFriendRequest(
    @User("userId") userId: string,
    @Body("id") friendId: string,
  ) {
    return this.usersService.acceptFriendRequest(userId, friendId);
  }
}
