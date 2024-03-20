import { Module } from "@nestjs/common";
import { UserService } from "./users.service";
import { UsersController } from "./users.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Profile } from "./entities/profile.entity";
import { Token } from "./entities/token.entity";
import { FriendShip } from "./entities/friendship.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User, Profile, Token, FriendShip])],
  providers: [UserService],
  controllers: [UsersController],
  exports: [TypeOrmModule, UserService],
})
export class UsersModule {}
