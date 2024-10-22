import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { User } from "./entities/users.entity";
import { DataSource, FindOneOptions, ILike, IsNull, Not } from "typeorm";
import { ChangePasswordDto, CreateUserDto, UpdateUserDto } from "./users.dto";
import { QueryDto } from "src/shared/dto/query.dto";
import { FirebaseService } from "../firebase/firebase.service";
import { Blocked } from "./entities/blocked.entity";

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

  async getAll(currentUserId: string, query: QueryDto) {
    const { search, page, limit } = query;

    const skip = (page - 1) * limit;

    const [users, total] = await this.dataSource
      .getRepository(User)
      .createQueryBuilder("u")
      .leftJoinAndSelect("u.profile", "profile")
      .where(
        'unaccent(u."firstName") ILIKE unaccent(:search) OR unaccent(u."lastName") ILIKE unaccent(:search)',
        {
          search: `%${search}%`,
        },
      )

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

  async block(id: string, blockedId: string) {
    const blockedBy = await this.findOne({
      where: { id },
      relations: ["profile"],
    });

    if (!blockedBy) {
      throw new NotFoundException("User not found");
    }

    const blocked = await this.dataSource.getRepository(Blocked).findOne({
      where: {
        user: { id: blockedId },
        blockedBy: { id },
      },
    });

    if (blocked) {
      throw new BadRequestException("User already blocked");
    }

    const user = await this.findOne({
      where: { id: blockedId, emailVerified: Not(IsNull()) },
      relations: ["profile"],
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    const newBlocked = this.dataSource.getRepository(Blocked).create({
      blockedBy,
      user,
    });

    await newBlocked.save();

    return { message: "User blocked successfully", blocked: newBlocked };
  }

  async unblock(id: string, blockedId: string) {
    const blocked = await this.dataSource.getRepository(Blocked).findOne({
      where: {
        user: { id: blockedId },
        blockedBy: { id },
      },
    });

    if (!blocked) {
      throw new BadRequestException("User not blocked");
    }

    await this.dataSource.getRepository(Blocked).remove(blocked);

    return { message: "User unblocked successfully" };
  }

  async getBlocked(id: string, query: QueryDto) {
    const { search, page, limit } = query;

    const skip = (page - 1) * limit;

    const [blocked, total] = await this.dataSource
      .getRepository(Blocked)
      .createQueryBuilder("blocked")
      .leftJoinAndSelect("blocked.user", "user")
      .leftJoinAndSelect("user.profile", "profile")
      .where("blocked.blockedBy = :id", { id })
      .andWhere(
        `unaccent("user"."firstName") ILIKE unaccent(:search) OR unaccent("user"."lastName") ILIKE unaccent(:search)`,
        {
          search: `${search}%`,
        },
      )
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    return { blocked, total, page, limit };
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
        bannedAt: IsNull(),
      },
      relations: ["profile"],
      withDeleted: true,
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

  async changePassword(id: string, body: ChangePasswordDto) {
    const user = await this.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    const isPasswordMatch = await user.comparePassword(body.currentPassword);

    if (!isPasswordMatch) {
      throw new BadRequestException("Current password is incorrect");
    }

    user.password = body.newPassword;

    await this.dataSource.getRepository(User).save(user);

    return { message: "Password updated successfully" };
  }
}
