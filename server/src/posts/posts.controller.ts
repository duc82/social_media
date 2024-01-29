import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { PostsService } from "./posts.service";
import { CreatePostDto } from "./dto/posts.dto";
import { AuthGuard } from "src/auth/auth.guard";
import { Request } from "express";
import { Role } from "src/users/entity/user.entity";
import { FilesInterceptor } from "@nestjs/platform-express";
import { User } from "src/users/users.decorator";

@Controller("api/posts")
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post("create")
  @UseGuards(AuthGuard)
  @UseInterceptors(FilesInterceptor("files[]", 4))
  async create(
    @Body() post: CreatePostDto,
    @User("userId") userId: string,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return this.postsService.create(post, userId, files);
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

  @Put("delete/:id")
  async deleteOne(@Param() id: string) {
    return this.postsService.deleteOne(id);
  }

  @Post("delete")
  async deleteMany(@Body() ids: string[]) {
    return this.postsService.deleteMany(ids);
  }
}
