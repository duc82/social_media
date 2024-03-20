import { Url } from "../url/url.decorator";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { UserService } from "./users.service";
import { AuthGuard } from "src/auth/auth.guard";
import { User } from "./users.decorator";
import { ProfileDto } from "./dto/user.dto";
import { FriendshipStatus } from "./interfaces/friendship.interface";

@Controller("api/users")
export class UsersController {
  constructor(private readonly usersService: UserService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getAllUsers(
    @Query("search") search: string,
    @Query("page", ParseIntPipe) page: number,
    @Query("limit", ParseIntPipe) limit: number,
    @User("userId") userId: string,
  ) {
    return this.usersService.getAll(search, userId, page, limit);
  }

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

  @UseGuards(AuthGuard)
  @Get("friends")
  async getFriends(
    @User("userId") userId: string,
    @Query("page", ParseIntPipe) page: number,
    @Query("limit", ParseIntPipe) limit: number,
  ) {
    return this.usersService.getFriends(
      userId,
      FriendshipStatus.ACCEPTED,
      page,
      limit,
    );
  }

  @UseGuards(AuthGuard)
  @Get("friends/pending")
  async getPendingFriendRequests(
    @User("userId") userId: string,
    @Query("page", ParseIntPipe) page: number,
    @Query("limit", ParseIntPipe) limit: number,
  ) {
    return this.usersService.getFriends(
      userId,
      FriendshipStatus.PENDING,
      page,
      limit,
    );
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
