import { Module } from "@nestjs/common";
import { MessagesController } from "./messages.controller";
import { MessagesService } from "./messages.service";
import { ConversationsModule } from "src/modules/conversations/conversations.module";
import { UsersModule } from "src/modules/users/users.module";

@Module({
  imports: [ConversationsModule, UsersModule],
  controllers: [MessagesController],
  providers: [MessagesService],
})
export class MessagesModule {}
