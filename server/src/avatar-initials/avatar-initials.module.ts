import { Module } from "@nestjs/common";
import { AvatarInitialsService } from "./avatar-initials.service";

@Module({
  providers: [AvatarInitialsService],
  exports: [AvatarInitialsService],
})
export class AvatarInitialsModule {}
