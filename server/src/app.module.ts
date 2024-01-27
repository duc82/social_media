import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { DataSource } from "typeorm";
import { AuthModule } from "./auth/auth.module";
import { PostsModule } from "./posts/posts.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { EventsGateway } from "./events/events.gateway";
import { CloudinaryModule } from "./cloudinary/cloudinary.module";
import { AvatarInitialsModule } from "./avatar-initials/avatar-initials.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: "postgres",
      url: process.env.DATABASE_URL,
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: true,
      autoLoadEntities: true,
    }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "public"),
    }),
    UsersModule,
    AuthModule,
    PostsModule,
    CloudinaryModule,
    AvatarInitialsModule,
  ],
  controllers: [AppController],
  providers: [AppService, EventsGateway],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
