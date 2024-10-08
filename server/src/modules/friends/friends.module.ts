import { Module } from "@nestjs/common";
import { FriendsController } from "./friends.controller";
import { FriendsService } from "./friends.service";
import { UsersModule } from "src/modules/users/users.module";

@Module({
  imports: [UsersModule],
  controllers: [FriendsController],
  providers: [FriendsService],
})
export class FriendsModule {}
