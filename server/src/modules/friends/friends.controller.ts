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
import { FriendsService } from "./friends.service";
import { QueryDto } from "src/shared/dto/query.dto";
import { FriendStatus } from "./friends.enum";
import { AuthGuard } from "src/common/guards/auth.guard";
import { User } from "src/common/decorators/user.decorator";

@UseGuards(AuthGuard)
@Controller("api/friends")
export class FriendsController {
  constructor(private readonly friendService: FriendsService) {}

  @Get("suggested")
  async getSuggestedFriends(
    @User("userId") currentUserId: string,
    @Query() query: QueryDto,
  ) {
    return this.friendService.getSuggestedFriends(currentUserId, query);
  }

  @Get("requests")
  async getFriendRequests(
    @User("userId") userId: string,
    @Query() query: QueryDto,
  ) {
    return this.friendService.getFriendRequests(userId, query);
  }

  @Get(":status")
  async getFriends(
    @User("userId") userId: string,
    @Param("status") status: FriendStatus,
    @Query() query: QueryDto,
  ) {
    return this.friendService.getFriends(userId, status, query);
  }

  @Get("count/:status")
  async countFriends(
    @User("userId") userId: string,
    @Param("status") status: FriendStatus,
  ) {
    return this.friendService.countFriends(userId, status);
  }

  @Get(":id/friend")
  async getFriend(@User("userId") userId: string, @Param("id") id: string) {
    return this.friendService.getFriend(userId, id);
  }

  @Post("send")
  async sendFriendRequest(
    @User("userId") userId: string,
    @Body("id") friendId: string,
  ) {
    return this.friendService.sendFriendRequest(userId, friendId);
  }

  @Delete("cancel/:id")
  async cancelFriendRequest(
    @User("userId") userId: string,
    @Param("id") friendId: string,
  ) {
    return this.friendService.cancelFriendRequest(userId, friendId);
  }

  @Post("accept")
  async acceptFriendRequest(
    @User("userId") userId: string,
    @Body("id") friendId: string,
  ) {
    return this.friendService.acceptFriendRequest(userId, friendId);
  }

  @Put("decline/:id")
  async declineFriendRequest(
    @User("userId") userId: string,
    @Param("id") friendId: string,
  ) {
    return this.friendService.declineFriendRequest(userId, friendId);
  }

  @Delete("remove/:id")
  async deleteFriend(
    @User("userId") userId: string,
    @Param("id") friendId: string,
  ) {
    return this.friendService.removeFriend(userId, friendId);
  }
}
