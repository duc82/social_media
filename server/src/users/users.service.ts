import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entity/user.entity";
import { FindOneOptions, Repository } from "typeorm";
import { CreateUserDto, ProfileDto } from "./users.dto";
import { Profile } from "./entity/profile.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
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
      relations: ["profile", "posts"],
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
}
