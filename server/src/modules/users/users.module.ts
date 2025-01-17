import { Module } from "@nestjs/common";
import { UserService } from "./users.service";
import { UsersController } from "./users.controller";
import { FirebaseModule } from "../firebase/firebase.module";
import { FriendsModule } from "../friends/friends.module";

@Module({
  imports: [FriendsModule, FirebaseModule],
  providers: [UserService],
  controllers: [UsersController],
  exports: [UserService],
})
export class UsersModule {}
