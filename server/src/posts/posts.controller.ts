import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from "@nestjs/common";
import { PostsService } from "./posts.service";
import { CreatePostDto } from "./posts.dto";
import { AuthGuard } from "src/auth/auth.guard";
import { Request } from "express";
import { Role } from "src/users/entity/user.entity";

@Controller("api/posts")
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post("create")
  async create(@Body() post: CreatePostDto) {
    return this.postsService.create(post);
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(
    @Req() req: Request & { user: { userId: string; role: Role } },
  ) {
    return this.postsService.findAll(req.user.userId);
  }

  @Get(":id")
  async findOneById(@Param() id: string) {
    return this.postsService.findById(id);
  }

  @Put("update/:id")
  async update(@Param() id: string, @Body() post: Partial<CreatePostDto>) {
    return this.postsService.update(id, post);
  }

  @Put("delete/:id")
  async deleteOne(@Param() id: string) {
    return this.postsService.deleteOne(id);
  }

  @Post("delete")
  async deleteMany(@Body() ids: string[]) {
    return this.postsService.deleteMany(ids);
  }
}
