import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { PostsModule } from "./posts/posts.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { EventsGateway } from "./events/events.gateway";
import { CloudinaryModule } from "./cloudinary/cloudinary.module";
import { AvatarInitialsModule } from "./avatar-initials/avatar-initials.module";
import { MailerModule } from "@nestjs-modules/mailer";
import { EjsAdapter } from "@nestjs-modules/mailer/dist/adapters/ejs.adapter";
import { AuthModule } from "./auth/auth.module";
import { CoreModule } from "./core/core.module";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    // TypeORM configuration
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: "postgres",
        url: configService.getOrThrow<string>("DATABASE_URL"),
        entities: [__dirname + "/**/*.entity{.ts,.js}"],
        logging:
          configService.get<string | undefined>("NODE_ENV") !== "production",
        autoLoadEntities: true,
      }),
    }),

    // Serve static files
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "public"),
    }),

    // Mailer configuration
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          service: "gmail",
          secure: true,
          auth: {
            user: configService.getOrThrow<string>("SMTP_USER"),
            pass: configService.getOrThrow<string>("SMTP_PASSWORD"),
          },
        },
        defaults: {
          from: configService.getOrThrow<string>("SMTP_FROM"),
        },
        template: {
          dir: process.cwd() + "/templates/mail/",
          adapter: new EjsAdapter({
            inlineCssEnabled: true,
            inlineCssOptions: {
              baseUrl: "file://" + "templates/mail/",
            },
          }),
        },
      }),
    }),
    CoreModule,
    AuthModule,
    UsersModule,
    PostsModule,
    CloudinaryModule,
    AvatarInitialsModule,
  ],
  controllers: [AppController],
  providers: [AppService, EventsGateway],
})
export class AppModule {}
