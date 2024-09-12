import { Post } from "./entities/posts.entity";
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreatePostDto, UpdatePostDto } from "./posts.dto";
import { DataSource, FindOneOptions } from "typeorm";
import { UserService } from "../users/users.service";
import { Comment } from "./entities/comments.entity";
import { QueryDto } from "src/shared/dto/query.dto";
import { FirebaseService } from "../firebase/firebase.service";

@Injectable()
export class PostsService {
  private readonly postRelations: string[] = [
    "user",
    "user.profile",
    "files",
    "likes",
  ];

  constructor(
    private dataSource: DataSource,
    private userService: UserService,
    private firebaseService: FirebaseService,
  ) {}

  async findOne(options?: FindOneOptions<Post>) {
    return this.dataSource.getRepository(Post).findOne(options);
  }

  async create(
    body: CreatePostDto,
    files: Array<Express.Multer.File>,
    currentUserId: string,
  ) {
    const user = await this.userService.findOne({
      where: { id: currentUserId },
      relations: ["profile"],
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    const newFiles = await this.firebaseService.uploadFiles(files, "posts");

    const post = this.dataSource.getRepository(Post).create({
      ...body,
      user,
      files: newFiles,
    });

    await this.dataSource.getRepository(Post).save(post);

    return {
      message: "Post created successfully",
      post: { ...post, likeCount: 0, commentCount: 0 },
    };
  }

  async update(
    id: string,
    body: UpdatePostDto,
    files: Array<Express.Multer.File>,
  ) {
    const post = await this.dataSource
      .getRepository(Post)
      .createQueryBuilder("post")
      .leftJoinAndSelect("post.user", "user")
      .leftJoinAndSelect("user.profile", "profile")
      .leftJoinAndSelect("post.files", "files")
      .loadRelationCountAndMap("post.likeCount", "post.likes")
      .loadRelationCountAndMap("post.commentCount", "post.comments")
      .where("post.id = :id", { id })
      .getOne();

    if (!post) {
      throw new NotFoundException("Post not found");
    }

    post.content = body.content || post.content;
    post.access = body.access || post.access;
    post.feeling = body.feeling || post.feeling;

    await this.dataSource.getRepository(Post).save(post);

    return {
      message: "Post updated successfully",
      post,
    };
  }

  async getAll(query: QueryDto) {
    const { page, limit, search = "" } = query;

    const skip = (page - 1) * limit;

    const [posts, total] = await this.dataSource
      .getRepository(Post)
      .createQueryBuilder("post")
      .leftJoinAndSelect("post.user", "user")
      .leftJoinAndSelect("user.profile", "profile")
      .leftJoinAndSelect("post.files", "files")
      .loadRelationCountAndMap("post.likeCount", "post.likes")
      .loadRelationCountAndMap("post.commentCount", "post.comments")
      .where("post.content ILIKE :search", { search: `%${search}%` })
      .orderBy("post.createdAt", "DESC")
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    return { posts, total, page, limit };
  }

  async getCurrent(currentUserId: string, query: QueryDto) {
    const { page, limit, search = "" } = query;

    const skip = (page - 1) * limit;

    const [posts, total] = await this.dataSource
      .getRepository(Post)
      .createQueryBuilder("post")
      .leftJoinAndSelect("post.user", "user")
      .leftJoinAndSelect("user.profile", "profile")
      .leftJoinAndSelect("post.files", "files")
      .loadRelationCountAndMap("post.likeCount", "post.likes")
      .loadRelationCountAndMap("post.commentCount", "post.comments")
      .where("post.userId = :userId", { userId: currentUserId })
      .andWhere("post.content ILIKE :search", { search: `%${search}%` })
      .orderBy("post.createdAt", "DESC")
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    return { posts, total, page, limit };
  }

  async hasUserLiked(postId: string, userId: string) {
    const post = await this.findOne({
      where: { id: postId, likes: { id: userId } },
      relations: ["likes"],
    });

    return { liked: !!post };
  }

  async getComments(postId: string, query: QueryDto) {
    const { page = 1, limit = 3 } = query;

    const skip = (page - 1) * limit;

    const [comments, total] = await this.dataSource
      .getRepository(Comment)
      .createQueryBuilder("comment")
      .leftJoinAndSelect("comment.user", "user")
      .leftJoinAndSelect("user.profile", "profile")
      .loadRelationCountAndMap("comment.likeCount", "comment.likes")
      .loadRelationCountAndMap("comment.replyCount", "comment.replies")
      .where("comment.postId = :postId", { postId })
      .orderBy("comment.createdAt", "DESC")
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    return { comments, total, page, limit };
  }

  async countComments(postId: string) {
    return this.dataSource.getRepository(Comment).count({
      where: {
        post: { id: postId },
      },
    });
  }

  async like(id: string, userId: string) {
    const post = await this.findOne({
      where: { id },
      relations: ["likes", "user", "user.profile", "files"],
    });

    if (!post) {
      throw new NotFoundException("Post not found");
    }

    const user = await this.userService.findOne({
      where: { id: userId },
      relations: ["profile"],
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    const index = post.likes.findIndex((like) => like.id === userId);

    if (index === -1) {
      post.likes.push(user);
    } else {
      post.likes.splice(index, 1);
    }

    await this.dataSource.getRepository(Post).save(post);

    return { message: "Post liked successfully", post };
  }

  async comment(id: string, userId: string, content: string) {
    const post = await this.findOne({
      where: { id },
    });

    if (!post) {
      throw new NotFoundException("Post not found");
    }

    const user = await this.userService.findOne({
      where: { id: userId },
      relations: ["profile"],
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    const newComment = this.dataSource.getRepository(Comment).create({
      content,
      user,
      post,
    });

    await this.dataSource.getRepository(Comment).save(newComment);

    return {
      message: "Comment created successfully",
      comment: { ...newComment, likeCount: 0, replyCount: 0 },
    };
  }

  async likeComment(id: string, userId: string) {
    const comment = await this.dataSource.getRepository(Comment).findOne({
      where: { id },
      relations: ["likes", "user", "user.profile"],
    });

    if (!comment) {
      throw new NotFoundException("Comment not found");
    }

    const user = await this.userService.findOne({
      where: { id: userId },
      relations: ["profile"],
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    const index = comment.likes.findIndex((like) => like.id === userId);

    if (index === -1) {
      comment.likes.push(user);
    } else {
      comment.likes.splice(index, 1);
    }

    await this.dataSource.getRepository(Comment).save(comment);

    return { message: "Comment liked successfully", comment };
  }

  async replyComment(
    id: string,
    commentId: string,
    userId: string,
    content: string,
  ) {
    const post = await this.findOne({
      where: { id },
    });

    if (!post) {
      throw new NotFoundException("Post not found");
    }

    const comment = post.comments.find((comment) => comment.id === commentId);

    if (!comment) {
      throw new NotFoundException("Comment not found");
    }

    const user = await this.userService.findOne({
      where: { id: userId },
      relations: ["profile"],
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    const newComment = this.dataSource.getRepository(Comment).create({
      content,
      user,
      post,
    });

    comment.replies.push(newComment);

    await this.dataSource.getRepository(Post).save(post);

    return { message: "Reply created successfully", post };
  }

  async remove(id: string) {
    const result = await this.dataSource
      .getRepository(Post)
      .createQueryBuilder()
      .softDelete()
      .where("id = :id", { id })
      .execute();

    if (result.affected === 0) {
      throw new NotFoundException("Post not found");
    }

    return { message: "Post deleted successfully" };
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
