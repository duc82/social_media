import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { FirebaseModule } from "../firebase/firebase.module";
import { FriendsModule } from "../friends/friends.module";

@Module({
  imports: [FriendsModule, FirebaseModule],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
