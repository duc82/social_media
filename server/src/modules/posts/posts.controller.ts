import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { PostsService } from "./posts.service";
import { CreatePostDto, UpdatePostDto } from "./posts.dto";
import { AuthGuard } from "src/common/guards/auth.guard";
import { User } from "src/common/decorators/user.decorator";
import { QueryDto } from "src/shared/dto/query.dto";
import { FilesInterceptor } from "@nestjs/platform-express";

@UseGuards(AuthGuard)
@Controller("api/posts")
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post("create")
  @UseInterceptors(
    FilesInterceptor("files", undefined, {
      fileFilter: (req, file, cb) => {
        // allow only image and video files
        if (
          !file.originalname.match(/\.(jpg|jpeg|png|webp|jfif|mp4|mov|avi)$/)
        ) {
          return cb(
            new BadRequestException("Only image and video files are allowed!"),
            false,
          );
        }
        cb(null, true);
      },
    }),
  )
  async create(
    @Body() post: CreatePostDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
    @User("userId") currentUserId: string,
  ) {
    console.log(post);
    return this.postsService.create(post, files, currentUserId);
  }

  @Get()
  async getAll(@Query() query: QueryDto) {
    return this.postsService.getAll(query);
  }

  @Get("current")
  async getCurrent(
    @User("userId") currentUserId: string,
    @Query() query: QueryDto,
  ) {
    return this.postsService.getCurrent(currentUserId, query);
  }

  @Get("likes/liked/:postId")
  async hasUserLiked(
    @Param("postId") postId: string,
    @User("userId") userId: string,
  ) {
    return this.postsService.hasUserLiked(postId, userId);
  }

  @Get("comments/:postId")
  async getComments(@Param("postId") postId: string, @Query() query: QueryDto) {
    return this.postsService.getComments(postId, query);
  }

  @Get("comments/replies/:commentId")
  async getReplies(
    @Param("commentId") commentId: string,
    @Query() query: QueryDto,
  ) {
    return this.postsService.getCommentReplies(commentId, query);
  }

  @Get("comments/count/:postId")
  async countComments(@Param("postId") postId: string) {
    return this.postsService.countComments(postId);
  }

  @Put("like/:id")
  async like(@Param("id") id: string, @User("userId") userId: string) {
    return this.postsService.like(id, userId);
  }

  @Put("comment/:id")
  async comment(
    @Param("id", new ParseUUIDPipe()) id: string,
    @User("userId") userId: string,
    @Body() { content }: { content: string },
  ) {
    return this.postsService.comment(id, userId, content);
  }

  @Put("comment/like/:id")
  async likeComment(
    @Param("id", new ParseUUIDPipe()) id: string,
    @User("userId") userId: string,
  ) {
    return this.postsService.likeComment(id, userId);
  }

  @Put("comment/reply/:id")
  async replyComment(
    @Param("id", new ParseUUIDPipe()) id: string,
    @User("userId") userId: string,
    @Body() { content }: { content: string },
  ) {
    return this.postsService.replyComment(id, userId, content);
  }

  @Put("update/:id")
  @UseInterceptors(
    FilesInterceptor("files", undefined, {
      fileFilter: (req, file, cb) => {
        // allow only image and video files
        if (!file.originalname.match(/\.(jpg|jpeg|png|webp|mp4|mov|avi)$/)) {
          return cb(
            new BadRequestException("Only image and video files are allowed!"),
            false,
          );
        }
        cb(null, true);
      },
    }),
  )
  async update(
    @Param("id") id: string,
    @Body() body: UpdatePostDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return this.postsService.update(id, body, files);
  }

  @Put("remove/:id")
  async remove(@Param("id") id: string) {
    return this.postsService.remove(id);
  }

  @Delete("delete/:id")
  async deleteOne(@Param("id") id: string) {
    return this.postsService.deleteOne(id);
  }

  @Delete("deleteMany")
  async deleteMany(@Body() ids: string[]) {
    return this.postsService.deleteMany(ids);
  }
}
