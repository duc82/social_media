import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { User } from "./entities/users.entity";
import { DataSource, IsNull, Not } from "typeorm";
import { ChangePasswordDto, UpdateUserDto } from "./users.dto";
import { QueryDto } from "src/shared/dto/query.dto";
import { FirebaseService } from "../firebase/firebase.service";
import { Blocked } from "./entities/blocked.entity";
import { FriendsService } from "../friends/friends.service";
import { instanceToPlain } from "class-transformer";
import { NotificationsService } from "../notifications/notifications.service";
import { AvatarService } from "../avatar/avatar.service";
import { Profile } from "./entities/profiles.entity";
import { SignUpDto } from "../auth/auth.dto";

@Injectable()
export class UsersService {
  public readonly userRepository = this.dataSource.getRepository(User);

  constructor(
    private dataSource: DataSource,
    private friendService: FriendsService,
    private notificationsService: NotificationsService,
    private firebaseService: FirebaseService,
    private avatarService: AvatarService,
  ) {}

  async getProfile(username: string) {
    const user = await this.userRepository
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.profile", "profile")
      .where("user.username = :username", { username })
      .getOne();

    return user;
  }

  async getAll(userId: string, query: QueryDto) {
    const { search, page, limit, exclude } = query;

    const skip = (page - 1) * limit;

    const excludeIds = JSON.parse(exclude);

    const [users, total] = await this.dataSource
      .getRepository(User)
      .createQueryBuilder("u")
      .leftJoinAndSelect("u.profile", "profile")
      .where("u.id != :userId", { userId })
      .andWhere((qb) => {
        const subQuery = qb
          .subQuery()
          .select("blocked.user")
          .from(Blocked, "blocked")
          .where("blocked.blockedBy = :userId", { userId })
          .getQuery();
        return `u.id NOT IN ${subQuery}`;
      })
      .andWhere((qb) => {
        const subQuery = qb
          .subQuery()
          .select("blocked.blockedBy")
          .from(Blocked, "blocked")
          .where("blocked.user = :userId", { userId })
          .getQuery();
        return `u.id NOT IN ${subQuery}`;
      })
      .andWhere(excludeIds.length > 0 && "u.id NOT IN (:...excludeIds)", {
        excludeIds: excludeIds,
      })
      .andWhere('unaccent(u."fullName") ILIKE unaccent(:search)', {
        search: `%${search}%`,
      })
      .andWhere("u.bannedAt IS NULL")
      .andWhere("u.emailVerified IS NOT NULL")
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    return { users, total, page, limit };
  }

  async getById(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    return user;
  }

  async follow(id: string, followId: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ["following"],
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    const follow = await this.userRepository.findOne({
      where: { id: followId },
    });

    if (!follow) {
      throw new NotFoundException("Follow user not found");
    }

    const isFollowing = user.following.some(
      (following) => following.id === followId,
    );

    if (isFollowing) {
      throw new BadRequestException("User already following");
    }

    user.following.push(follow);

    await this.dataSource.getRepository(User).save(user);

    return { message: "User followed successfully" };
  }

  async getStories(id: string, query: QueryDto) {
    const { page, limit } = query;

    const skip = (page - 1) * limit;

    const [users, total] = await this.dataSource
      .getRepository(User)
      .createQueryBuilder("u")
      .leftJoinAndSelect("u.stories", "stories")
      .leftJoinAndSelect("u.profile", "profile")
      .where("u.createdAt < :time", { time: new Date() })
      .orderBy("stories.createdAt", "DESC")
      .groupBy("u.id")
      .addGroupBy("profile.id")
      .addGroupBy("stories.id")
      .having("COUNT(stories.id) > 0")
      .take(limit)
      .skip(skip)
      .getManyAndCount();

    return {
      users,
      total,
      limit,
      skip,
    };
  }

  async block(id: string, blockedId: string) {
    const blockedBy = await this.userRepository.findOne({
      where: { id },
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

    const user = await this.userRepository.findOne({
      where: { id: blockedId, emailVerified: Not(IsNull()) },
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

  async create(user: SignUpDto) {
    const { birthday, gender, ...userData } = user;
    const buffer = await this.avatarService.generateAvatar(userData.firstName);

    const avatar = await this.firebaseService.uploadFileFromBuffer(
      buffer,
      `avatars/${userData.email}`,
    );

    const profile = this.dataSource.getRepository(Profile).create({
      avatar,
      birthday,
      gender,
    });

    const newUser = this.userRepository.create({
      ...userData,
      profile,
    });
    await this.userRepository.save(newUser);
    await this.notificationsService.createSettings(newUser.id);
    return newUser;
  }

  async update(id: string, body: UpdateUserDto, file?: Express.Multer.File) {
    const { firstName, lastName, username, isAvatar, ...profile } = body;

    const user = await this.userRepository.findOne({
      where: {
        id,
        bannedAt: IsNull(),
      },
      withDeleted: true,
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    if (file) {
      if (isAvatar) {
        const path = `avatars/${user.email}-${Date.now()}`;
        const newAvatar = await this.firebaseService.uploadFile(file, path);
        user.profile.avatar = newAvatar;
      } else {
        const path = `wallpapers/${user.email}-${Date.now()}`;
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

    await this.userRepository.save(instanceToPlain(user));

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
    const user = await this.userRepository.findOne({
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
