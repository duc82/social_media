import { Module } from "@nestjs/common";
import { ConversationsController } from "./conversations.controller";
import { ConversationsService } from "./conversations.service";
import { UsersModule } from "../users/users.module";
import { MessagesModule } from "../messages/messages.module";
import { FirebaseModule } from "../firebase/firebase.module";

@Module({
  imports: [UsersModule, MessagesModule, FirebaseModule],
  controllers: [ConversationsController],
  providers: [ConversationsService],
  exports: [ConversationsService],
})
export class ConversationsModule {}
