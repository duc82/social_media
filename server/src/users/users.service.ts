import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entity/user.entity";
import { FindOneOptions, Repository } from "typeorm";
import { CreateUserDto } from "./user.dto";
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

  async create(createUserDto: CreateUserDto) {
    const newUser = this.userRepository.create(createUserDto);
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

  async updateProfile(id: string, attrs: Partial<Profile>) {
    const user = await this.findById(id, {
      relations: {
        profile: true,
      },
    });

    if (!user) {
      throw new NotFoundException("Not Found User");
    }

    if (!user.profile) {
      const newProfile = this.profileRepository.create({ ...attrs, user });
      await this.profileRepository.save(newProfile);
      return { message: "Update success" };
    }

    await this.profileRepository.update(id, attrs);
    return { message: "Update success" };
  }
}
