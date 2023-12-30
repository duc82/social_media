import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entity/user.entity";
import { FindOneOptions, Repository } from "typeorm";
import { CreateUserDto, UpdateUserProfileDto } from "./users.dto";
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
    const deletedResult = await this.userRepository.delete({ id });
    return deletedResult;
  }

  async deleteAll(ids: string[]) {
    const deletedResult = await this.userRepository.delete(ids);
    return deletedResult;
  }

  async getUserProfile(id: string) {
    const user = await this.findById(id, {
      relations: ["profile", "posts"],
    });
    return user;
  }

  async updateUserProfile(id: string, attrs: UpdateUserProfileDto) {
    const user = await this.findById(id, {
      relations: ["profile"],
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    // Upsert profile
    if (!user.profile) {
      const newProfile = this.profileRepository.create(attrs);
      await this.profileRepository.save(newProfile);
      user.profile = newProfile;
      await this.userRepository.save(user);
    } else {
      await this.profileRepository.update({ id }, attrs);
      user.profile = await this.profileRepository.findOne({ where: { id } });
    }

    return { user, message: "Profile updated successfully" };
  }
}
