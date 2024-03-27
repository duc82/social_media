import { Global, Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.getOrThrow<string>("JWT_SECRET"),
        global: true,
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [JwtModule],
})
export class CoreModule {}
