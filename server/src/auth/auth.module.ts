import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { UsersModule } from "src/users/users.module";
import { AuthService } from "./auth.service";

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: "secret",
      signOptions: {
        expiresIn: "5m",
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [JwtModule],
})
export class AuthModule {}
