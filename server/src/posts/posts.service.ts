import { InjectRepository } from "@nestjs/typeorm";
import { Post } from "./entity/post.entity";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { CreatePostDto } from "./posts.dto";
import { UsersService } from "src/users/users.service";

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    private readonly usersService: UsersService,
  ) {}

  async create(post: CreatePostDto) {
    const newPost = this.postRepository.create(post);

    newPost.user = await this.usersService.findById(post.userId, {
      relations: ["profile"],
    });

    await this.postRepository.save(newPost);

    return newPost;
  }

  async findAll(userId: string) {
    return await this.postRepository.find({
      where: { user: { id: userId } },
      relations: ["user"],
    });
  }

  async findById(id: string) {
    return await this.postRepository.findOne({ where: { id } });
  }

  async update(id: string, post: Partial<CreatePostDto>) {
    await this.postRepository.update({ id }, post);
    return await this.findById(id);
  }

  async deleteOne(id: string) {
    await this.postRepository.delete({ id });
    return { deleted: true };
  }

  async deleteMany(ids: string[]) {
    await this.postRepository.delete(ids);
    return { deleted: true };
  }
}
