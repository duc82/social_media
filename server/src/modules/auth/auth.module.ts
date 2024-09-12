import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { UsersModule } from "src/modules/users/users.module";
import { AuthService } from "./auth.service";
import { AvatarModule } from "../avatar/avatar.module";
import { FirebaseModule } from "../firebase/firebase.module";

@Module({
  imports: [UsersModule, FirebaseModule, AvatarModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
