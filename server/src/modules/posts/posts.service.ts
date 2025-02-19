import { Post } from "./entities/posts.entity";
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { CreatePostDto, UpdatePostDto } from "./posts.dto";
import { DataSource, FindOneOptions } from "typeorm";
import { UsersService } from "../users/users.service";
import { Comment } from "./entities/comments.entity";
import { QueryDto } from "src/shared/dto/query.dto";
import { FirebaseService } from "../firebase/firebase.service";
import { NotificationsService } from "../notifications/notifications.service";
import { NotificationType } from "../notifications/enums/notifications.enum";
import { WebSocketService } from "../events/events.gateway";

@Injectable()
export class PostsService {
  public readonly postRepository = this.dataSource.getRepository(Post);

  constructor(
    private dataSource: DataSource,
    private usersService: UsersService,
    private notificationsService: NotificationsService,
    private firebaseService: FirebaseService,
    private webSocketService: WebSocketService,
  ) {}

  async create(
    body: CreatePostDto,
    files: Array<Express.Multer.File>,
    currentUserId: string,
  ) {
    const user = await this.usersService.userRepository.findOne({
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
      likes: [],
      comments: [],
    });

    await this.dataSource.getRepository(Post).save(post);

    return {
      message: "Post created successfully",
      post: { ...post, commentCount: 0, totalComment: 0 },
    };
  }

  async update(
    id: string,
    body: UpdatePostDto,
    _files: Array<Express.Multer.File>,
  ) {
    const post = await this.dataSource
      .getRepository(Post)
      .createQueryBuilder("post")
      .leftJoinAndSelect("post.user", "user")
      .leftJoinAndSelect("user.profile", "profile")
      .leftJoinAndSelect("post.files", "files")
      .loadAllRelationIds({
        relations: ["likes"],
      })
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
    const { page, limit, search } = query;

    const skip = (page - 1) * limit;

    const commentQuery = this.dataSource
      .createQueryBuilder()
      .subQuery()
      .select("comment.id")
      .from(Comment, "comment")
      .where("comment.postId = post.id")
      .andWhere("comment.parentCommentId IS NULL")
      .orderBy("comment.createdAt", "DESC")
      .limit(3)
      .getQuery();

    const [posts, total] = await this.dataSource
      .getRepository(Post)
      .createQueryBuilder("post")
      .leftJoinAndSelect("post.user", "user")
      .leftJoinAndSelect("user.profile", "profile")
      .leftJoinAndSelect("post.files", "files")
      .leftJoinAndSelect(
        "post.comments",
        "comments",
        `comments.id IN ${commentQuery}`,
      )
      .leftJoinAndSelect("comments.user", "commentUser")
      .leftJoinAndSelect("commentUser.profile", "commentProfile")
      .leftJoinAndSelect("comments.likes", "commentLikes")
      .loadAllRelationIds({
        relations: ["likes"],
      })
      .loadRelationCountAndMap("comments.replyCount", "comments.childComments")
      .loadRelationCountAndMap(
        "post.totalComment",
        "post.comments",
        "totalComment",
        (qb) => qb.where("totalComment.parentCommentId IS NULL"),
      )
      .where("unaccent(post.content) ILIKE unaccent(:search)", {
        search: `%${search}%`,
      })
      .orderBy("post.createdAt", "DESC")
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    return { posts, total, page, limit };
  }

  async getByUserId(userId: string, query: QueryDto) {
    const { page, limit, search } = query;

    const skip = (page - 1) * limit;

    const commentQuery = this.dataSource
      .createQueryBuilder()
      .subQuery()
      .select("comment.id")
      .from(Comment, "comment")
      .where("comment.postId = post.id")
      .andWhere("comment.parentCommentId IS NULL")
      .orderBy("comment.createdAt", "DESC")
      .limit(3)
      .getQuery();

    const [posts, total] = await this.dataSource
      .getRepository(Post)
      .createQueryBuilder("post")
      .leftJoinAndSelect("post.user", "user")
      .leftJoinAndSelect("user.profile", "profile")
      .leftJoinAndSelect("post.files", "files")
      .leftJoinAndSelect(
        "post.comments",
        "comments",
        `comments.id IN (${commentQuery})`,
      )
      .leftJoinAndSelect("comments.user", "commentUser")
      .leftJoinAndSelect("commentUser.profile", "commentProfile")
      .leftJoinAndSelect("comments.likes", "commentLikes")
      .loadAllRelationIds({
        relations: ["likes"],
      })
      .loadRelationCountAndMap("comments.replyCount", "comments.childComments")
      .loadRelationCountAndMap("post.totalComment", "post.comments")
      .loadRelationCountAndMap(
        "post.commentCount",
        "post.comments",
        "commentCount",
        (qb) => qb.where("commentCount.parentCommentId IS NULL"),
      )
      .where("post.userId = :userId", { userId })
      .andWhere("unaccent(post.content) ILIKE unaccent(:search)", {
        search: `%${search}%`,
      })
      .orderBy("post.createdAt", "DESC")
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    return { posts, total, page, limit };
  }

  async getById(userId: string) {
    const post = await this.dataSource.getRepository(Post).findOne({
      where: { id: userId },
      relations: ["user", "user.profile", "files", "likes", "comments"],
      loadRelationIds: {
        relations: ["likes"],
      },
    });

    if (!post) {
      throw new NotFoundException("Post not found");
    }

    return {
      post,
      message: "Post retrieved successfully",
    };
  }

  async getComments(postId: string, query: QueryDto) {
    const { page = 1, limit = 3 } = query;

    const skip = (page - 1) * limit;

    const [comments, total] = await this.dataSource
      .getRepository(Comment)
      .createQueryBuilder("comment")
      .leftJoinAndSelect("comment.user", "user")
      .leftJoinAndSelect("user.profile", "profile")
      .leftJoinAndSelect("comment.likes", "likes")
      .loadRelationCountAndMap("comment.replyCount", "comment.childComments")
      .where("comment.postId = :postId", { postId })
      .andWhere("comment.parentCommentId IS NULL")
      .orderBy("comment.createdAt", "DESC")
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    return { comments, total, page, limit };
  }

  async getCommentReplies(commentId: string, query: QueryDto) {
    const { page = 1, limit = 3 } = query;

    const skip = (page - 1) * limit;

    const [comments, total] = await this.dataSource
      .getRepository(Comment)
      .createQueryBuilder("comment")
      .leftJoinAndSelect("comment.user", "user")
      .leftJoinAndSelect("user.profile", "profile")
      .leftJoinAndSelect("comment.likes", "likes")
      .loadRelationCountAndMap("comment.replyCount", "comment.childComments")
      .where("comment.parentCommentId = :commentId", { commentId })
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
    const post = await this.postRepository.findOne({
      where: { id },
      relations: ["likes", "user"],
      select: {
        id: true,
        user: { id: true },
      },
    });

    if (!post) {
      throw new NotFoundException("Post not found");
    }

    const user = await this.usersService.getById(userId);

    if (!user) {
      throw new NotFoundException("User not found");
    }

    const index = post.likes.findIndex((like) => like.id === userId);

    if (index !== -1) {
      throw new BadRequestException("Post already liked");
    }

    post.likes.push(user);

    await this.dataSource.getRepository(Post).save(post);

    const isNotificationExists =
      await this.notificationsService.notificationRepository.existsBy({
        post: { id: post.id },
        actor: { id: userId },
        user: { id: post.user.id },
      });

    if (post.user.notificationSettings.likes && !isNotificationExists) {
      const notification = await this.notificationsService.create({
        userId: post.user.id,
        actor: user,
        content: "liked your post",
        type: NotificationType.LIKE,
        postId: post.id,
      });
      const server = this.webSocketService.getServer();
      server.emit("notification", notification);
    }

    return {
      message: "Post liked successfully",
    };
  }

  async unlike(id: string, userId: string) {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: ["likes"],
      select: ["likes"],
    });

    if (!post) {
      throw new NotFoundException("Post not found");
    }

    const user = await this.usersService.userRepository.findOne({
      where: { id: userId },
      select: ["id"],
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    const index = post.likes.findIndex((like) => like.id === userId);

    if (index === -1) {
      throw new BadRequestException("Post not liked");
    }

    post.likes.splice(index, 1);

    await this.dataSource.getRepository(Post).save(post);

    return {
      message: "Post unliked successfully",
    };
  }

  async comment(id: string, userId: string, content: string) {
    const post = await this.postRepository.findOne({
      where: { id },
    });

    if (!post) {
      throw new NotFoundException("Post not found");
    }

    const user = await this.usersService.userRepository.findOne({
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
      likes: [],
    });

    await this.dataSource.getRepository(Comment).save(newComment);

    return {
      message: "Comment created successfully",
      comment: { ...newComment, replyCount: 0 },
    };
  }

  async likeComment(id: string, userId: string) {
    const comment = await this.dataSource.getRepository(Comment).findOne({
      where: { id },
      relations: ["likes"],
      select: ["likes"],
    });

    if (!comment) {
      throw new NotFoundException("Comment not found");
    }

    const user = await this.usersService.userRepository.findOne({
      where: { id: userId },
      select: ["id"],
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    const index = comment.likes.findIndex((like) => like.id === userId);

    if (index !== -1) {
      throw new BadRequestException("Comment already liked");
    }

    comment.likes.push(user);

    await this.dataSource.getRepository(Comment).save(comment);

    return {
      message: "Comment liked successfully",
    };
  }

  async unlikeComment(id: string, userId: string) {
    const comment = await this.dataSource.getRepository(Comment).findOne({
      where: { id },
      relations: ["likes"],
      select: ["likes"],
    });

    if (!comment) {
      throw new NotFoundException("Comment not found");
    }

    const user = await this.usersService.userRepository.findOne({
      where: { id: userId },
      select: ["id"],
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    const index = comment.likes.findIndex((like) => like.id === userId);

    if (index === -1) {
      throw new BadRequestException("Comment not liked");
    }

    comment.likes.splice(index, 1);

    await this.dataSource.getRepository(Comment).save(comment);

    return {
      message: "Comment unliked successfully",
    };
  }

  async replyComment(id: string, currentUserId: string, content: string) {
    const parentComment = await this.dataSource.getRepository(Comment).findOne({
      where: { id },
      relations: ["post"],
    });

    if (!parentComment) {
      throw new NotFoundException("Comment not found");
    }

    const user = await this.usersService.userRepository.findOne({
      where: { id: currentUserId },
      relations: ["profile"],
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    const newComment = this.dataSource.getRepository(Comment).create({
      content,
      user,
      post: parentComment.post,
      parentComment,
      likes: [],
    });

    await this.dataSource.getRepository(Comment).save(newComment);

    return {
      message: "Comment replied successfully",
      comment: { ...newComment, replyCount: 0 },
    };
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
