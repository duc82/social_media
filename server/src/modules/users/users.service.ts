import { Injectable, NotFoundException } from "@nestjs/common";
import { User } from "./entities/users.entity";
import { And, DataSource, FindOneOptions } from "typeorm";
import { CreateUserDto, ProfileDto, UpdateUserDto } from "./users.dto";
import { Profile } from "./entities/profiles.entity";
import { QueryDto } from "src/shared/dto/query.dto";
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

  async update(id: string, attrs: UpdateUserDto) {
    await this.dataSource.getRepository(User).update({ id }, attrs);
    const user = await this.getById(id);
    return { user, message: "User updated successfully" };
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

  async deleteOne(id: string) {
    const user = await this.getById(id);
    user.softDelete();
    await user.save();
    return { message: "User deleted successfully" };
  }
}
