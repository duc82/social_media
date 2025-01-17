import { Module } from "@nestjs/common";
import { StoriesController } from "./stories.controller";
import { StoriesService } from "./stories.service";
import { UsersModule } from "../users/users.module";
import { FirebaseModule } from "../firebase/firebase.module";

@Module({
  imports: [UsersModule, FirebaseModule],
  controllers: [StoriesController],
  providers: [StoriesService],
})
export class StoriesModule {}
