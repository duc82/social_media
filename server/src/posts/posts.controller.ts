import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { PostsService } from "./posts.service";
import { CreatePostDto, ListAllPostsDto } from "./dto/posts.dto";
import { AuthGuard } from "src/auth/auth.guard";
import { FilesInterceptor } from "@nestjs/platform-express";
import { User } from "src/users/users.decorator";

@Controller("api/posts")
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(AuthGuard)
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
  async getAll(@Query() query: ListAllPostsDto) {
    return this.postsService.getAll(query);
  }

  @UseGuards(AuthGuard)
  @Delete("delete/:id")
  async deleteOne(@Param("id") id: string) {
    return this.postsService.deleteOne(id);
  }

  @UseGuards(AuthGuard)
  @Delete("deleteMany")
  async deleteMany(@Body() ids: string[]) {
    return this.postsService.deleteMany(ids);
  }
}
