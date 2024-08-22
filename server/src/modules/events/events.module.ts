import { Module } from "@nestjs/common";
import { EventsGateway } from "./events.gateway";
import { AuthModule } from "src/modules/auth/auth.module";
import { UsersModule } from "../users/users.module";

@Module({
  imports: [AuthModule, UsersModule],
  providers: [EventsGateway],
})
export class EventsModule {}
