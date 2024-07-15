import { Module } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { PostsController } from "./posts.controller";
import { UsersModule } from "src/modules/users/users.module";

@Module({
  imports: [UsersModule],
  providers: [PostsService],
  controllers: [PostsController],
})
export class PostsModule {}
