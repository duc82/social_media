import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { UsersModule } from "src/users/users.module";
import { AuthService } from "./auth.service";
import { CloudinaryModule } from "src/cloudinary/cloudinary.module";
import { AvatarInitialsModule } from "src/avatar-initials/avatar-initials.module";
import * as dotenv from "dotenv";

dotenv.config();

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      global: true,
    }),
    CloudinaryModule,
    AvatarInitialsModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [JwtModule],
})
export class AuthModule {}
