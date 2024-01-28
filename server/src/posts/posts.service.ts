import { InjectRepository } from "@nestjs/typeorm";
import { Post } from "./entity/post.entity";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { CreatePostDto } from "./dto/posts.dto";
import { UsersService } from "src/users/users.service";
import { CloudinaryService } from "src/cloudinary/cloudinary.service";

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    private readonly usersService: UsersService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(post: CreatePostDto, files: Array<Express.Multer.File>) {
    if (files.length > 0) {
    }
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

  async deleteOne(id: string) {
    await this.postRepository.delete({ id });
    return { deleted: true };
  }

  async deleteMany(ids: string[]) {
    await this.postRepository.delete(ids);
    return { deleted: true };
  }
}
