import { InjectRepository } from "@nestjs/typeorm";
import { Post } from "./entity/post.entity";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { CreatePostDto } from "./dto/posts.dto";
import { UsersService } from "src/users/users.service";
import { CloudinaryService } from "src/cloudinary/cloudinary.service";
import { File } from "./entity/file.entity";

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    @InjectRepository(File) private readonly fileRepository: Repository<File>,
    private readonly usersService: UsersService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(
    post: CreatePostDto,
    userId: string,
    files: Array<Express.Multer.File>,
  ) {
    const newPost = this.postRepository.create({
      ...post,
      user: {
        id: userId,
      },
    });

    if (files.length) {
      const newFiles = await Promise.all(
        files.map(async (file) => {
          const uploadedFile =
            await this.cloudinaryService.uploadFileFromBuffer(file.buffer);

          return this.fileRepository.create({
            url: uploadedFile.secure_url,
            type: uploadedFile.resource_type,
          });
        }),
      );

      newPost.files = newFiles;
    }

    await this.postRepository.save(newPost);

    return {
      message: "Post created successfully",
      post: newPost,
    };
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
