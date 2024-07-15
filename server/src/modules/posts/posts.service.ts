import { Post } from "./entities/posts.entity";
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreatePostDto, ListAllPostsDto } from "./posts.dto";
import { User } from "src/modules/users/entities/users.entity";
import { PostFile } from "./entities/post_files.entity";
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

  constructor(private dataSource: DataSource) {}

  async create(post: CreatePostDto, userId: string) {
    const user = await this.dataSource.getRepository(User).findOne({
      where: { id: userId },
      relations: ["profile"],
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    if (post.files.length > 0) {
      post.files = post.files.map((file) =>
        this.dataSource.getRepository(PostFile).create(file),
      ) as PostFile[];
    }

    const newPost = this.dataSource.getRepository(Post).create({
      access: post.access,
      content: post.content,
      files: post.files,
      likes: [],
      comments: [],
      user,
    });

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
