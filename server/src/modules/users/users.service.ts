import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { User } from "./entities/users.entity";
import { DataSource, FindOneOptions, IsNull, Not } from "typeorm";
import { CreateUserDto, UpdateUserDto } from "./users.dto";
import { QueryDto } from "src/shared/dto/query.dto";
import { BlockedUser } from "./entities/blocked_users.entity";
import { FirebaseService } from "../firebase/firebase.service";

@Injectable()
export class UserService {
  constructor(
    private dataSource: DataSource,
    private firebaseService: FirebaseService,
  ) {}

  async findOne(options?: FindOneOptions<User>) {
    return this.dataSource.getRepository(User).findOne(options);
  }

  async getProfile(username: string) {
    const user = await this.findOne({
      where: { username },
      relations: ["profile"],
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    return user;
  }

  async getCurrent(id: string) {
    const user = await this.findOne({
      where: { id },
      relations: ["profile"],
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    return user;
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
      .where('unaccent(u."firstName") ILIKE unaccent(:search)', {
        search: `%${search}%`,
      })
      .andWhere('unaccent(u."lastName") ILIKE unaccent(:search)', {
        search: `%${search}%`,
      })
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    return { users, total, page, limit };
  }

  async getById(id: string) {
    const user = await this.findOne({
      where: { id, deletedAt: IsNull(), bannedAt: IsNull() },
      relations: ["profile"],
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    return user;
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

  async update(id: string, body: UpdateUserDto, file?: Express.Multer.File) {
    const { firstName, lastName, username, isAvatar, ...profile } = body;

    const user = await this.findOne({
      where: {
        id,
        deletedAt: IsNull(),
        bannedAt: IsNull(),
      },
      relations: ["profile"],
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    if (file) {
      if (isAvatar) {
        const path = `avatars/${user.email}`;
        const newAvatar = await this.firebaseService.uploadFile(file, path);
        user.profile.avatar = newAvatar;
      } else {
        const path = `wallpapers/${user.email}`;
        const newWallpaper = await this.firebaseService.uploadFile(file, path);
        user.profile.wallpaper = newWallpaper;
      }
    }

    if (username) {
      const isUsernameExist = await this.dataSource
        .getRepository(User)
        .existsBy({
          id: Not(id),
          username,
          deletedAt: IsNull(),
          bannedAt: IsNull(),
        });

      if (isUsernameExist) {
        throw new BadRequestException("Username already exists");
      }
      user.username = username;
    }

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;

    if (Object.keys(profile).length > 0) {
      for (const key in profile) {
        user.profile[key] = profile[key];
      }
    }

    await this.dataSource.getRepository(User).save(user);

    return { user, message: "Profile updated successfully" };
  }

  async remove(id: string) {
    const result = await this.dataSource
      .getRepository(User)
      .createQueryBuilder()
      .softDelete()
      .where("id = :id AND deletedAt IS NULL", { id })
      .execute();

    if (result.affected === 0) {
      throw new NotFoundException("User not found");
    }

    return { message: "Deleted user successfully" };
  }
}
