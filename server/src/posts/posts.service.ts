import { InjectRepository } from "@nestjs/typeorm";
import { Post } from "./entity/post.entity";
import { Repository } from "typeorm";
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreatePostDto } from "./dto/posts.dto";
import { CloudinaryService } from "src/cloudinary/cloudinary.service";
import { File } from "./entity/file.entity";
import { User } from "src/users/entity/user.entity";

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    @InjectRepository(File) private readonly fileRepository: Repository<File>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(
    post: CreatePostDto,
    userId: string,
    files: Array<Express.Multer.File>,
  ) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ["profile"],
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    const newPost = this.postRepository.create({
      ...post,
      user,
      files: [],
      likes: [],
      comments: [],
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

  async getAll() {
    return await this.postRepository.find({
      relations: ["user", "user.profile", "files", "likes", "comments"],
    });
  }

  async getMyPosts(userId: string) {
    return await this.postRepository.find({
      where: { user: { id: userId } },
      relations: ["user", "user.profile", "files", "likes", "comments"],
    });
  }

  async deleteOne(id: string) {
    await this.postRepository.delete({ id });
    return { message: "Post deleted successfully" };
  }

  async deleteMany(ids: string[]) {
    await this.postRepository.delete(ids);
    return { deleted: true };
  }
}
