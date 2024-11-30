import { Module } from "@nestjs/common";
import { MessagesController } from "./messages.controller";
import { MessagesService } from "./messages.service";
import { UsersModule } from "src/modules/users/users.module";
import { FirebaseModule } from "../firebase/firebase.module";

@Module({
  imports: [UsersModule, FirebaseModule],
  controllers: [MessagesController],
  providers: [MessagesService],
  exports: [MessagesService],
})
export class MessagesModule {}
