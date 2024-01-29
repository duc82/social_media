import { Module } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { PostsController } from "./posts.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Post } from "./entity/post.entity";
import { Comment } from "./entity/comment.entity";
import { UsersModule } from "src/users/users.module";
import { CloudinaryModule } from "src/cloudinary/cloudinary.module";
import { File } from "./entity/file.entity";

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
