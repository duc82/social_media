import { Module } from "@nestjs/common";
import { ConversationsController } from "./conversations.controller";
import { ConversationsService } from "./conversations.service";
import { UsersModule } from "../users/users.module";
import { MessagesModule } from "../messages/messages.module";

@Module({
  imports: [UsersModule, MessagesModule],
  controllers: [ConversationsController],
  providers: [ConversationsService],
  exports: [ConversationsService],
})
export class ConversationsModule {}
