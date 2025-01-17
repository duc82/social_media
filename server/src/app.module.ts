import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./modules/users/users.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { PostsModule } from "./modules/posts/posts.module";
import { MailerModule } from "@nestjs-modules/mailer";
import { EjsAdapter } from "@nestjs-modules/mailer/dist/adapters/ejs.adapter";
import { AuthModule } from "./modules/auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConversationsModule } from "./modules/conversations/conversations.module";
import { MessagesModule } from "./modules/messages/messages.module";
import { GroupsModule } from "./modules/groups/groups.module";
import { EventsModule } from "./modules/events/events.module";
import { BlogsModule } from "./modules/blogs/blogs.module";
import { NotificationsModule } from "./modules/notifications/notifications.module";
import { FriendsModule } from "./modules/friends/friends.module";
import { JwtGlobalModule } from "./modules/jwt/jwt.module";
import { FilesModule } from "./modules/files/files.module";
import { FirebaseModule } from "./modules/firebase/firebase.module";
import { AvatarModule } from "./modules/avatar/avatar.module";
import { StoriesModule } from "./modules/stories/stories.module";

@Module({
  imports: [
    // Config module
    ConfigModule.forRoot({ isGlobal: true }),

    // TypeORM configuration
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: "postgres",
        url: configService.getOrThrow<string>("DATABASE_URL"),
        entities: [__dirname + "/**/*.entity{.ts,.js}"],
        logging: false,
        autoLoadEntities: true,
      }),
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
    JwtGlobalModule,
    AuthModule,
    UsersModule,
    PostsModule,
    ConversationsModule,
    MessagesModule,
    GroupsModule,
    EventsModule,
    BlogsModule,
    NotificationsModule,
    FriendsModule,
    FirebaseModule,
    FilesModule,
    AvatarModule,
    StoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
