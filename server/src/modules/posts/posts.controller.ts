import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from "@nestjs/common";
import { PostsService } from "./posts.service";
import { CreatePostDto, ListAllPostsDto } from "./posts.dto";
import { AuthGuard } from "src/common/guards/auth.guard";
import { User } from "src/common/decorators/user.decorator";

@Controller("api/posts")
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(AuthGuard)
  @Post("create")
  async create(@Body() post: CreatePostDto, @User("userId") userId: string) {
    return this.postsService.create(post, userId);
  }

  @Get()
  async getAll(@Query() query: ListAllPostsDto) {
    return this.postsService.getAll(query);
  }

  @UseGuards(AuthGuard)
  @Put("like/:id")
  async like(@Param("id") id: string, @User("userId") userId: string) {
    return this.postsService.like(id, userId);
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
