import { Module } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { PostsController } from "./posts.controller";
import { UsersModule } from "src/modules/users/users.module";
import { FirebaseModule } from "../firebase/firebase.module";
import { NotificationsModule } from "../notifications/notifications.module";
import { EventsModule } from "../events/events.module";

@Module({
  imports: [UsersModule, NotificationsModule, FirebaseModule, EventsModule],
  providers: [PostsService],
  controllers: [PostsController],
})
export class PostsModule {}
