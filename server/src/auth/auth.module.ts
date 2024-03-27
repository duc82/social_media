import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { UsersModule } from "src/users/users.module";
import { AuthService } from "./auth.service";
import { CloudinaryModule } from "src/cloudinary/cloudinary.module";
import { AvatarInitialsModule } from "src/avatar-initials/avatar-initials.module";

@Module({
  imports: [UsersModule, CloudinaryModule, AvatarInitialsModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
