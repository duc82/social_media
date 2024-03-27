import { Post } from "./entities/post.entity";
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreatePostDto, ListAllPostsDto } from "./dto/posts.dto";
import { CloudinaryService } from "src/cloudinary/cloudinary.service";
import { User } from "src/users/entities/user.entity";
import { File } from "./entities/file.entity";
import { DataSource, ILike } from "typeorm";

@Injectable()
export class PostsService {
  private readonly postRelations: string[] = [
    "user",
    "user.profile",
    "files",
    "likes",
    "comments",
  ];

  constructor(
    private dataSource: DataSource,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(
    post: CreatePostDto,
    userId: string,
    files: Array<Express.Multer.File>,
  ) {
    const user = await this.dataSource.getRepository(User).findOne({
      where: { id: userId },
      relations: ["profile"],
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    const newPost = this.dataSource.getRepository(Post).create({
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

          return this.dataSource.getRepository(File).create({
            url: uploadedFile.secure_url,
            type: uploadedFile.resource_type,
          });
        }),
      );

      newPost.files = newFiles;
    }

    await this.dataSource.getRepository(Post).save(newPost);

    return {
      message: "Post created successfully",
      post: newPost,
    };
  }

  async getAll(query: ListAllPostsDto) {
    const { page = 1, limit = 10, search = "", userId } = query;

    const skip = (page - 1) * limit;

    const where = {
      content: ILike(`%${search}%`),
    };

    if (userId) {
      where["user"] = { id: userId };
    }

    const posts = await this.dataSource.getRepository(Post).find({
      where,
      skip,
      take: limit,
      order: {
        createdAt: "DESC",
      },
      relations: this.postRelations,
    });

    const total = await this.dataSource.getRepository(Post).count({ where });

    return { posts, total, page, limit };
  }

  async deleteOne(id: string) {
    await this.dataSource.getRepository(Post).delete({ id });
    return { message: "Post deleted successfully" };
  }

  async deleteMany(ids: string[]) {
    await this.dataSource.getRepository(Post).delete(ids);
    return { deleted: true };
  }
}
