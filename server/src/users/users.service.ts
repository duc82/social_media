import { Injectable, NotFoundException } from "@nestjs/common";
import { User } from "./entities/user.entity";
import {
  DataSource,
  FindOneOptions,
  FindOptionsWhere,
  In,
  IsNull,
  Not,
} from "typeorm";
import { CreateUserDto, ProfileDto } from "./dto/user.dto";
import { Profile } from "./entities/profile.entity";
import { FriendShip } from "./entities/friendship.entity";
import { FriendshipStatus } from "./interfaces/friendship.interface";
import { QueryDto } from "src/dto/query.dto";

@Injectable()
export class UserService {
  constructor(private dataSource: DataSource) {}

  async findByEmail(email: string, options?: FindOneOptions<User>) {
    return this.dataSource.getRepository(User).findOne({
      where: { email },
      ...options,
    });
  }

  async findById(id: string, options?: FindOneOptions<User>) {
    return this.dataSource.getRepository(User).findOne({
      where: {
        id,
      },
      ...options,
    });
  }

  async getAll(query: QueryDto) {
    const { search, page, limit } = query;

    const skip = (page - 1) * limit;

    const users = await this.dataSource
      .getRepository(User)
      .createQueryBuilder("u")
      .leftJoinAndSelect("u.profile", "profile")
      .where('unaccent(u."fullName") ILIKE unaccent(:search)', {
        search: `%${search}%`,
      })
      .skip(skip)
      .take(limit)
      .getMany();

    const total = await this.dataSource.getRepository(User).count();

    return { users, total, page, limit };
  }

  async create(user: CreateUserDto) {
    const newUser = this.dataSource.getRepository(User).create(user);
    await this.dataSource.getRepository(User).save(newUser);
    return newUser;
  }

  async update(id: string, attrs: Partial<User>) {
    await this.dataSource.getRepository(User).update({ id }, attrs);
    return this.findById(id);
  }

  async delete(id: string) {
    const user = await this.findById(id);

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

  async getUserProfile(id: string) {
    const user = await this.findById(id, {
      relations: ["profile"],
    });
    return user;
  }

  async getSuggestedFriends(userId: string, query: QueryDto) {
    const { page, limit } = query;

    const skip = (page - 1) * limit;

    const friendships = await this.dataSource.getRepository(FriendShip).find({
      where: [
        {
          user: {
            id: userId,
          },
        },
        {
          friend: {
            id: userId,
          },
        },
      ],
      relations: ["user", "friend"],
    });

    const friendIds = friendships.map((friendship) => {
      if (friendship.user.id === userId) {
        return friendship.friend.id;
      }
      return friendship.user.id;
    });

    friendIds.push(userId);

    const where: FindOptionsWhere<User> | FindOptionsWhere<User>[] = {
      id: Not(In(friendIds)),
      emailVerified: Not(IsNull()),
    };

    const suggestedFriends = await this.dataSource.getRepository(User).find({
      where,
      relations: ["profile"],
      skip,
      take: limit,
    });

    const total = await this.dataSource.getRepository(User).count({
      where,
    });

    return { friends: suggestedFriends, page, limit, total };
  }

  async updateUserProfile(id: string, profile: ProfileDto, url: string) {
    const user = await this.findById(id, {
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
    // SELECT EXISTS(SELECT 1 FROM friend_ship WHERE userId = ${userId} AND friendId = ${friendId})

    if (friendshipExist) {
      friendshipExist.status = FriendshipStatus.PENDING;
      await this.dataSource.getRepository(FriendShip).save(friendshipExist);
      return friendshipExist;
    }

    const newFriendship = this.dataSource.getRepository(FriendShip).create({
      user: { id: userId },
      friend: { id: friendId },
    });
    // INSERT INTO friend_ship (userId, friendId) VALUES (${userId}, ${friendId})

    await this.dataSource.getRepository(FriendShip).save(newFriendship);

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
    // DELETE FROM friend_ship WHERE id = ${friendship.id}

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
    await this.dataSource.getRepository(FriendShip).save(friendship);

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

    await this.dataSource.getRepository(FriendShip).save(friendship);

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

    const where: FindOptionsWhere<FriendShip> | FindOptionsWhere<FriendShip>[] =
      [
        { user: { id: userId }, status },
        { friend: { id: userId }, status },
      ];

    const friendships = await this.dataSource.getRepository(FriendShip).find({
      where,
      skip,
      take: limit,
      relations: ["user", "friend", "user.profile", "friend.profile"],
    });
    // SELECT * FROM friend_ship WHERE (userId = ${userId} OR friendId = ${userId}) AND status = ${status} LIMIT ${limit} OFFSET ${skip}

    const friends = friendships.map((friendship) => {
      if (friendship.user.id === userId) {
        return friendship.friend;
      }
      return friendship.user;
    });

    const total = await this.dataSource.getRepository(FriendShip).count({
      where,
    });

    return { friends, total, page, limit };
  }
}
