import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { FirebaseModule } from "../firebase/firebase.module";
import { FriendsModule } from "../friends/friends.module";
import { NotificationsModule } from "../notifications/notifications.module";
import { AvatarModule } from "../avatar/avatar.module";

@Module({
  imports: [FriendsModule, NotificationsModule, FirebaseModule, AvatarModule],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
