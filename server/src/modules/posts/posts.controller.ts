import {
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
import { FilesArrayMimeTypeValidationPipe } from "src/common/pipes/file.pipe";

@UseGuards(AuthGuard)
@Controller("api/posts")
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post("create")
  @UseInterceptors(FilesInterceptor("files", undefined))
  async create(
    @Body() post: CreatePostDto,
    @UploadedFiles(FilesArrayMimeTypeValidationPipe)
    files: Array<Express.Multer.File>,
    @User("userId") currentUserId: string,
  ) {
    return this.postsService.create(post, files, currentUserId);
  }

  @Get()
  async getAll(@Query() query: QueryDto) {
    return this.postsService.getAll(query);
  }

  @Get(":userId")
  async getCurrent(@Param("userId") userId: string, @Query() query: QueryDto) {
    return this.postsService.getByUserId(userId, query);
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

  @Put("unlike/:id")
  async unlike(@Param("id") id: string, @User("userId") userId: string) {
    return this.postsService.unlike(id, userId);
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

  @Put("comment/unlike/:id")
  async unlikeComment(
    @Param("id", new ParseUUIDPipe()) id: string,
    @User("userId") userId: string,
  ) {
    return this.postsService.unlikeComment(id, userId);
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
  @UseInterceptors(FilesInterceptor("files", undefined))
  async update(
    @Param("id") id: string,
    @Body() body: UpdatePostDto,
    @UploadedFiles(FilesArrayMimeTypeValidationPipe)
    files: Array<Express.Multer.File>,
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
