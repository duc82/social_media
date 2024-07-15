import { Injectable, NotFoundException } from "@nestjs/common";
import { QueryDto } from "src/shared/dto/query.dto";
import { UserService } from "src/modules/users/users.service";
import { And, DataSource, In, IsNull, Not, Raw } from "typeorm";
import { Friend } from "./friends.entity";
import { User } from "src/modules/users/entities/users.entity";
import { FriendStatus } from "./friends.enum";

@Injectable()
export class FriendsService {
  constructor(
    private dataSource: DataSource,
    private userService: UserService,
  ) {}

  async getSuggestedFriends(currentUserId: string, query: QueryDto) {
    const { page, limit, search } = query;

    const skip = (page - 1) * limit;

    const blockedUsers = await this.userService.getBlockedUsers(currentUserId);

    const friends = await this.dataSource.getRepository(Friend).find({
      where: [
        {
          user: {
            id: currentUserId,
          },
        },
        {
          friend: {
            id: currentUserId,
          },
        },
      ],
      relations: ["user", "friend"],
    });

    const friendIds = friends.map((friend) => {
      if (friend.user.id === currentUserId) {
        return friend.friend.id;
      }
      return friend.user.id;
    });

    friendIds.push(currentUserId);

    const [suggestedFriends, total] = await this.dataSource
      .getRepository(User)
      .findAndCount({
        where: {
          id: And(Not(In(friendIds)), Not(In(blockedUsers))),
          emailVerified: Not(IsNull()),
          fullName: Raw(
            (alias) => `unaccent(${alias}) ILIKE unaccent('%${search}%')`,
            { search },
          ),
        },
        relations: ["profile"],
        skip,
        take: limit,
      });

    return { friends: suggestedFriends, page, limit, total };
  }

  async getFriendRequests(currentUserId: string, query: QueryDto) {
    const { page, limit } = query;
    const skip = (page - 1) * limit;

    const [friendships, total] = await this.dataSource
      .getRepository(Friend)
      .findAndCount({
        where: {
          friend: { id: currentUserId },
          status: FriendStatus.PENDING,
        },
        skip,
        take: limit,
        relations: ["user", "friend", "user.profile", "friend.profile"],
      });

    const friends = friendships.map((friendship) => {
      return friendship.user;
    });

    return { friends, total, page, limit };
  }

  async getFriends(userId: string, status: FriendStatus, query: QueryDto) {
    const { page, limit } = query;
    const skip = (page - 1) * limit;

    const [friendships, total] = await this.dataSource
      .getRepository(Friend)
      .findAndCount({
        where: [
          { user: { id: userId }, status },
          { friend: { id: userId }, status },
        ],
        skip,
        take: limit,
        relations: ["user", "friend", "user.profile", "friend.profile"],
      });

    const friends = friendships.map((friendship) => {
      if (friendship.user.id === userId) {
        return friendship.friend;
      }
      return friendship.user;
    });

    return { friends, total, page, limit };
  }

  async getFriend(userId: string, friendId: string) {
    const friend = await this.dataSource.getRepository(Friend).findOne({
      where: [
        { user: { id: userId }, friend: { id: friendId } },
        { user: { id: friendId }, friend: { id: userId } },
      ],
      relations: ["user", "friend"],
    });

    if (!friend) {
      throw new NotFoundException("Friend not found");
    }

    return friend;
  }

  async sendFriendRequest(userId: string, friendId: string) {
    const friendExist = await this.dataSource.getRepository(Friend).findOne({
      where: [
        { user: { id: userId }, friend: { id: friendId } },
        { user: { id: friendId }, friend: { id: userId } },
      ],
      relations: ["user", "friend"],
    });

    if (friendExist) {
      friendExist.status = FriendStatus.PENDING;
      await friendExist.save();
      return friendExist;
    }

    const newFriend = this.dataSource.getRepository(Friend).create({
      user: { id: userId },
      friend: { id: friendId },
    });

    await newFriend.save();

    return newFriend;
  }

  async cancelFriendRequest(userId: string, friendId: string) {
    const friend = await this.dataSource.getRepository(Friend).findOne({
      where: {
        user: { id: userId },
        friend: { id: friendId },
      },
      relations: ["user", "friend"],
    });

    if (!friend) {
      throw new NotFoundException("Friend not found");
    }

    await this.dataSource.getRepository(Friend).delete(friend.id);

    return { message: "Friend canceled successfully" };
  }

  async acceptFriendRequest(userId: string, friendId: string) {
    const friend = await this.dataSource.getRepository(Friend).findOne({
      where: {
        user: { id: friendId },
        friend: { id: userId },
        status: FriendStatus.PENDING,
      },
      relations: ["user", "friend"],
    });

    if (!friend) {
      throw new NotFoundException("Friend not found");
    }

    friend.status = FriendStatus.ACCEPTED;
    await friend.save();

    return friend;
  }

  async declineFriendRequest(userId: string, friendId: string) {
    const friend = await this.dataSource.getRepository(Friend).findOne({
      where: [
        { user: { id: friendId }, friend: { id: userId } },
        { user: { id: userId }, friend: { id: friendId } },
      ],
      relations: ["user", "friend"],
    });

    if (!friend) {
      throw new NotFoundException("Friend not found");
    }

    friend.status = FriendStatus.DECLINED;
    friend.user.id = userId;
    friend.friend.id = friendId;

    await friend.save();

    return friend;
  }
}
