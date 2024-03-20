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
import { MailerModule } from "@nestjs-modules/mailer";
import { EjsAdapter } from "@nestjs-modules/mailer/dist/adapters/ejs.adapter";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    // Typeorm configuration
    TypeOrmModule.forRoot({
      type: "postgres",
      url: process.env.DATABASE_URL,
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: true,
      autoLoadEntities: true,
      logging: true,
    }),

    // Serve static files
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "public"),
    }),

    // Mailer configuration
    MailerModule.forRoot({
      transport: {
        service: "gmail",
        secure: true,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      },
      defaults: {
        from: process.env.SMTP_FROM,
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

    UsersModule,
    AuthModule,
    PostsModule,
    CloudinaryModule,
    AvatarInitialsModule,
  ],
  controllers: [AppController],
  providers: [AppService, EventsGateway],
})
export class AppModule {}
