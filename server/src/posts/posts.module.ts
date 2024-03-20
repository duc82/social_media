import { Module } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { PostsController } from "./posts.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Post } from "./entities/post.entity";
import { Comment } from "./entities/comment.entity";
import { UsersModule } from "src/users/users.module";
import { CloudinaryModule } from "src/cloudinary/cloudinary.module";
import { File } from "./entities/file.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, Comment, File]),
    UsersModule,
    CloudinaryModule,
  ],
  providers: [PostsService],
  controllers: [PostsController],
})
export class PostsModule {}
