import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { AvatarModule } from "../avatar/avatar.module";
import { FirebaseModule } from "../firebase/firebase.module";
import { UsersModule } from "../users/users.module";

@Module({
  imports: [FirebaseModule, AvatarModule, UsersModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
