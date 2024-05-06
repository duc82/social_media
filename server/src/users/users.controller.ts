import { Url } from "../url/url.decorator";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from "@nestjs/common";
import { UserService } from "./users.service";
import { AuthGuard } from "src/auth/auth.guard";
import { User } from "./users.decorator";
import { ProfileDto } from "./dto/user.dto";
import { QueryDto } from "src/dto/query.dto";
import { GetFriendsParams } from "./dto/friend.dto";

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
  @Get("current")
  async getCurrentUser(@User("userId") userId: string) {
    console.log("get current");
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

  @Get(":id/friends/:status")
  async getFriends(@Param() param: GetFriendsParams, @Query() query: QueryDto) {
    return this.usersService.getFriends(param.id, param.status, query);
  }

  @UseGuards(AuthGuard)
  @Get("friends/:id/friendship")
  async getFriendship(@User("userId") userId: string, @Param("id") id: string) {
    return this.usersService.getFriendship(userId, id);
  }

  @UseGuards(AuthGuard)
  @Post("friends/send")
  async sendFriendRequest(
    @User("userId") userId: string,
    @Body("id") friendId: string,
  ) {
    return this.usersService.sendFriendRequest(userId, friendId);
  }

  @UseGuards(AuthGuard)
  @Delete("friends/cancel/:id")
  async cancelFriendRequest(
    @User("userId") userId: string,
    @Param("id") friendId: string,
  ) {
    return this.usersService.cancelFriendRequest(userId, friendId);
  }

  @UseGuards(AuthGuard)
  @Post("friends/accept")
  async acceptFriendRequest(
    @User("userId") userId: string,
    @Body("id") friendId: string,
  ) {
    return this.usersService.acceptFriendRequest(userId, friendId);
  }

  @UseGuards(AuthGuard)
  @Put("friends/decline/:id")
  async declineFriendRequest(
    @User("userId") userId: string,
    @Param("id") friendId: string,
  ) {
    return this.usersService.declineFriendRequest(userId, friendId);
  }
}
