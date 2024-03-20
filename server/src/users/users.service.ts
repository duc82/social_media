import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { FindOneOptions, Repository } from "typeorm";
import { CreateUserDto, ProfileDto } from "./dto/user.dto";
import { Profile } from "./entities/profile.entity";
import { FriendShip } from "./entities/friendship.entity";
import { FriendshipStatus } from "./interfaces/friendship.interface";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    @InjectRepository(FriendShip)
    private readonly friendShipRepository: Repository<FriendShip>,
  ) {}

  async findByEmail(email: string, options: FindOneOptions<User> = {}) {
    return this.userRepository.findOne({
      where: { email },
      ...options,
    });
  }

  async findById(id: string, options: FindOneOptions<User> = {}) {
    return this.userRepository.findOne({
      where: {
        id,
      },
      ...options,
    });
  }

  async getAll(search: string, userId: string, page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const users = await this.userRepository
      .createQueryBuilder("u")
      .leftJoinAndSelect("u.profile", "profile")
      .where('unaccent(u."fullName") ILIKE unaccent(:search)', {
        search: `%${search}%`,
      })
      .andWhere("u.id != :userId", { userId })
      .skip(skip)
      .take(limit)
      .getMany();

    const total = await this.userRepository.count();

    return { users, total, page, limit };
  }

  async create(user: CreateUserDto) {
    const newUser = this.userRepository.create(user);
    await this.userRepository.save(newUser);
    return newUser;
  }

  async update(id: string, attrs: Partial<User>) {
    await this.userRepository.update({ id }, attrs);
    return this.findById(id);
  }

  async delete(id: string) {
    const user = await this.findById(id);

    if (!user) {
      throw new NotFoundException("User not found");
    }

    const deletedResult = await this.userRepository.delete({ id });
    return { message: "User deleted successfully", deletedResult };
  }

  async deleteMany(ids: string[]) {
    const deletedResult = await this.userRepository.delete(ids);
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
      const newProfile = this.profileRepository.create(profile);
      user.profile = newProfile;
    } else {
      await this.profileRepository.update({ id: user.profile.id }, profile);
      user.profile = await this.profileRepository.findOne({
        where: { id: user.profile.id },
      });
    }

    await this.userRepository.save(user);
    return { user, message: "Profile updated successfully" };
  }

  async sendFriendRequest(userId: string, friendId: string) {
    const existsingFriendship = await this.friendShipRepository.findOne({
      where: {
        user: { id: userId },
        friend: { id: friendId },
      },
    });

    if (existsingFriendship) {
      throw new BadRequestException("Friendship already exists");
    }

    const newFriendship = this.friendShipRepository.create({
      user: { id: userId },
      friend: { id: friendId },
    });

    await this.friendShipRepository.save(newFriendship);

    return newFriendship;
  }

  async acceptFriendRequest(userId: string, friendId: string) {
    const friendship = await this.friendShipRepository.findOne({
      where: {
        user: { id: friendId },
        friend: { id: userId },
      },
    });

    if (!friendship) {
      throw new NotFoundException("Friendship not found");
    }

    friendship.status = FriendshipStatus.ACCEPTED;
    await this.friendShipRepository.save(friendship);

    return friendship;
  }

  async getFriends(
    userId: string,
    status: FriendshipStatus = FriendshipStatus.ACCEPTED,
    page = 1,
    limit = 10,
  ) {
    const skip = (page - 1) * limit;
    const friendships = await this.friendShipRepository.find({
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

    const total = await this.friendShipRepository.count({
      where: [
        { user: { id: userId }, status },
        { friend: { id: userId }, status },
      ],
    });

    return { friends, total, page, limit };
  }
}
