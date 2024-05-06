import { Global, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: async () => ({
        global: true,
      }),
    }),
  ],
  exports: [JwtModule],
})
export class CoreModule {}
