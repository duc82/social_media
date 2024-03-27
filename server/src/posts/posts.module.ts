import { Module } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { PostsController } from "./posts.controller";
import { UsersModule } from "src/users/users.module";
import { CloudinaryModule } from "src/cloudinary/cloudinary.module";

@Module({
  imports: [UsersModule, CloudinaryModule],
  providers: [PostsService],
  controllers: [PostsController],
})
export class PostsModule {}
