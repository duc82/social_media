import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { User } from "./entities/user.entity";
import { DataSource, FindOneOptions } from "typeorm";
import { CreateUserDto, ListFriendsDto, ProfileDto } from "./dto/user.dto";
import { Profile } from "./entities/profile.entity";
import { FriendShip } from "./entities/friendship.entity";
import { FriendshipStatus } from "./interfaces/friendship.interface";
import { QueryDto } from "src/dto/query.dto";

@Injectable()
export class UserService {
  constructor(private dataSource: DataSource) {}

  async findByEmail(email: string, options: FindOneOptions<User> = {}) {
    return this.dataSource.getRepository(User).findOne({
      where: { email },
      ...options,
    });
  }

  async findById(id: string, options: FindOneOptions<User> = {}) {
    return this.dataSource.getRepository(User).findOne({
      where: {
        id,
      },
      ...options,
    });
  }

  async getAll(query: QueryDto) {
    const { search = "", page = 1, limit = 10 } = query;

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
    const existsingFriendship = await this.dataSource
      .getRepository(FriendShip)
      .findOne({
        where: {
          user: { id: userId },
          friend: { id: friendId },
        },
      });
    // SELECT * FROM friend_ship WHERE userId = ${userId} AND friendId = ${friendId}

    if (existsingFriendship) {
      throw new BadRequestException("Friendship already exists");
    }

    const newFriendship = this.dataSource.getRepository(FriendShip).create({
      user: { id: userId },
      friend: { id: friendId },
    });

    await this.dataSource.getRepository(FriendShip).save(newFriendship);

    return newFriendship;
  }

  async acceptFriendRequest(userId: string, friendId: string) {
    const friendship = await this.dataSource.getRepository(FriendShip).findOne({
      where: {
        user: { id: friendId },
        friend: { id: userId },
      },
    });

    if (!friendship) {
      throw new NotFoundException("Friendship not found");
    }

    friendship.status = FriendshipStatus.ACCEPTED;
    await this.dataSource.getRepository(FriendShip).save(friendship);

    return friendship;
  }

  async getFriends(query: ListFriendsDto) {
    const { page = 1, limit = 10, status, userId } = query;
    const skip = (page - 1) * limit;

    const where: Record<string, Record<string, string> | FriendshipStatus>[] = [
      { user: { id: userId } },
      { friend: { id: userId } },
    ];

    if (status) {
      where.push({ status });
    }

    const friendships = await this.dataSource.getRepository(FriendShip).find({
      where,
      skip,
      take: limit,
      relations: ["user", "friend", "user.profile", "friend.profile"],
    });
    // SELECT * FROM friend_ship WHERE (userId = ${userId} OR friendId = ${userId}) AND status = ${status}

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
