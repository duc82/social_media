import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { PostsService } from "./posts.service";
import { CreatePostDto } from "./dto/posts.dto";
import { AuthGuard } from "src/auth/auth.guard";
import { FilesInterceptor } from "@nestjs/platform-express";
import { User } from "src/users/users.decorator";

@UseGuards(AuthGuard)
@Controller("api/posts")
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post("create")
  @UseInterceptors(FilesInterceptor("file[]", 12))
  async create(
    @Body() post: CreatePostDto,
    @User("userId") userId: string,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return this.postsService.create(post, userId, files);
  }

  @Get()
  async getAll() {
    return this.postsService.getAll();
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
