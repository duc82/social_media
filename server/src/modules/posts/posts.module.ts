import { Module } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { PostsController } from "./posts.controller";
import { UsersModule } from "src/modules/users/users.module";
import { FirebaseModule } from "../firebase/firebase.module";

@Module({
  imports: [UsersModule, FirebaseModule],
  providers: [PostsService],
  controllers: [PostsController],
})
export class PostsModule {}
