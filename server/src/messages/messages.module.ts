import { Module } from "@nestjs/common";
import { MessagesController } from "./messages.controller";
import { MessagesService } from "./messages.service";
import { ConversationsModule } from "src/conversations/conversations.module";
import { UsersModule } from "src/users/users.module";

@Module({
  imports: [ConversationsModule, UsersModule],
  controllers: [MessagesController],
  providers: [MessagesService],
})
export class MessagesModule {}
