import { Injectable, NotFoundException } from "@nestjs/common";
import { User } from "./entities/users.entity";
import { And, DataSource, FindOneOptions, In, IsNull, Not, Raw } from "typeorm";
import { CreateUserDto, ProfileDto } from "./users.dto";
import { Profile } from "./entities/profiles.entity";
import { FriendShip } from "./entities/friendships.entity";
import { FriendshipStatus } from "./interfaces/friendships.interface";
import { QueryDto } from "src/dto/query.dto";
import { BlockedUser } from "./entities/blocked_users.entity";

@Injectable()
export class UserService {
  constructor(private dataSource: DataSource) {}

  async findByEmail(email: string, options?: FindOneOptions<User>) {
    return this.dataSource.getRepository(User).findOne({
      where: { email },
      ...options,
    });
  }

  async getProfile(id: string) {
    const user = await this.getById(id, {
      relations: ["profile"],
    });
    return user;
  }

  async getById(id: string, options?: FindOneOptions<User>) {
    return this.dataSource.getRepository(User).findOne({
      where: {
        id,
      },
      ...options,
    });
  }

  async getBlockedUsers(userId: string) {
    const usersBlockedByCurrentUser = await this.dataSource
      .getRepository(BlockedUser)
      .find({
        where: {
          blockedUserId: userId,
        },
        relations: ["user"],
      });

    const usersBlockingCurrentUser = await this.dataSource
      .getRepository(BlockedUser)
      .find({
        where: {
          user: {
            id: userId,
          },
        },
      });

    return [
      ...usersBlockedByCurrentUser.map((blockedUser) => blockedUser.user.id),
      ...usersBlockingCurrentUser.map(
        (blockedUser) => blockedUser.blockedUserId,
      ),
    ];
  }

  async getAll(query: QueryDto) {
    const { search, page, limit } = query;

    const skip = (page - 1) * limit;

    const [users, total] = await this.dataSource
      .getRepository(User)
      .createQueryBuilder("u")
      .leftJoinAndSelect("u.profile", "profile")
      .where('unaccent(u."fullName") ILIKE unaccent(:search)', {
        search: `%${search}%`,
      })
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    return { users, total, page, limit };
  }

  async search(currentUserId: string, query: QueryDto) {
    const { search, page, limit } = query;

    const skip = (page - 1) * limit;

    const blockedUsers = await this.getBlockedUsers(currentUserId);

    const [users, total] = await this.dataSource
      .getRepository(User)
      .createQueryBuilder("u")
      .leftJoinAndSelect("u.profile", "profile")
      .where('unaccent(u."fullName") ILIKE unaccent(:search)', {
        search: `%${search}%`,
      })
      .andWhere("u.emailVerified IS NOT NULL")
      .andWhere("u.isBan = false")
      .andWhere(
        blockedUsers.length > 0 ? "u.id NOT IN (:...blockedUsers)" : "TRUE",
        { blockedUsers },
      )
      .skip(skip)
      .limit(limit)
      .getManyAndCount();

    return { users, total, page, limit };
  }

  async create(user: CreateUserDto) {
    const newUser = this.dataSource.getRepository(User).create(user);
    await newUser.save();
    return newUser;
  }

  async update(id: string, attrs: Partial<User>) {
    await this.dataSource.getRepository(User).update({ id }, attrs);
    return this.getById(id);
  }

  async delete(id: string) {
    const user = await this.getById(id);

    if (!user) {
      throw new NotFoundException("User not found");
    }

    const deletedResult = await this.dataSource
      .getRepository(User)
      .delete({ id });
    return { message: "User deleted successfully", deletedResult };
  }

  async deleteMany(ids: string[]) {
    const deletedResult = await this.dataSource.getRepository(User).delete(ids);
    return deletedResult;
  }

  async getSuggestedFriends(currentUserId: string, query: QueryDto) {
    const { page, limit, search } = query;

    const skip = (page - 1) * limit;

    const blockedUsers = await this.getBlockedUsers(currentUserId);

    const friendships = await this.dataSource.getRepository(FriendShip).find({
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

    const friendIds = friendships.map((friendship) => {
      if (friendship.user.id === currentUserId) {
        return friendship.friend.id;
      }
      return friendship.user.id;
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

  async updateProfile(id: string, profile: ProfileDto, url: string) {
    const user = await this.getById(id, {
      relations: ["profile"],
    });

    delete user.password;

    if (!user) {
      throw new NotFoundException("User not found");
    }

    if (!profile.wallpaper) {
      profile.wallpaper = url + "/wallpaper.jpg";
    }

    // Upsert profile
    if (!user.profile) {
      const newProfile = this.dataSource.getRepository(Profile).create(profile);
      user.profile = newProfile;
    } else {
      await this.dataSource
        .getRepository(Profile)
        .update({ id: user.profile.id }, profile);
      user.profile = await this.dataSource.getRepository(Profile).findOne({
        where: { id: user.profile.id },
      });
    }

    await this.dataSource.getRepository(User).save(user);
    return { user, message: "Profile updated successfully" };
  }

  async sendFriendRequest(userId: string, friendId: string) {
    const friendshipExist = await this.dataSource
      .getRepository(FriendShip)
      .findOne({
        where: [
          { user: { id: userId }, friend: { id: friendId } },
          { user: { id: friendId }, friend: { id: userId } },
        ],
        relations: ["user", "friend"],
      });

    if (friendshipExist) {
      friendshipExist.status = FriendshipStatus.PENDING;
      await friendshipExist.save();
      return friendshipExist;
    }

    const newFriendship = this.dataSource.getRepository(FriendShip).create({
      user: { id: userId },
      friend: { id: friendId },
    });

    await newFriendship.save();

    return newFriendship;
  }

  async cancelFriendRequest(userId: string, friendId: string) {
    const friendship = await this.dataSource.getRepository(FriendShip).findOne({
      where: {
        user: { id: userId },
        friend: { id: friendId },
      },
      relations: ["user", "friend"],
    });

    if (!friendship) {
      throw new NotFoundException("Friendship not found");
    }

    await this.dataSource.getRepository(FriendShip).delete(friendship.id);

    return { message: "Friendship canceled successfully" };
  }

  async acceptFriendRequest(userId: string, friendId: string) {
    const friendship = await this.dataSource.getRepository(FriendShip).findOne({
      where: {
        user: { id: friendId },
        friend: { id: userId },
        status: FriendshipStatus.PENDING,
      },
      relations: ["user", "friend"],
    });

    if (!friendship) {
      throw new NotFoundException("Friendship not found");
    }

    friendship.status = FriendshipStatus.ACCEPTED;
    await friendship.save();

    return friendship;
  }

  async declineFriendRequest(userId: string, friendId: string) {
    const friendship = await this.dataSource.getRepository(FriendShip).findOne({
      where: [
        { user: { id: friendId }, friend: { id: userId } },
        { user: { id: userId }, friend: { id: friendId } },
      ],
      relations: ["user", "friend"],
    });

    if (!friendship) {
      throw new NotFoundException("Friendship not found");
    }

    friendship.status = FriendshipStatus.DECLINED;
    friendship.user.id = userId;
    friendship.friend.id = friendId;

    await friendship.save();

    return friendship;
  }

  async getFriendship(userId: string, friendId: string) {
    const friendship = await this.dataSource.getRepository(FriendShip).findOne({
      where: [
        { user: { id: userId }, friend: { id: friendId } },
        { user: { id: friendId }, friend: { id: userId } },
      ],
      relations: ["user", "friend"],
    });

    if (!friendship) {
      throw new NotFoundException("Friendship not found");
    }

    return friendship;
  }

  async getFriends(userId: string, status: FriendshipStatus, query: QueryDto) {
    const { page, limit } = query;
    const skip = (page - 1) * limit;

    const [friendships, total] = await this.dataSource
      .getRepository(FriendShip)
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

  async getFriendRequests(currentUserId: string, query: QueryDto) {
    const { page, limit } = query;
    const skip = (page - 1) * limit;

    const [friendships, total] = await this.dataSource
      .getRepository(FriendShip)
      .findAndCount({
        where: {
          friend: { id: currentUserId },
          status: FriendshipStatus.PENDING,
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
}
