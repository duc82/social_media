import { IsEnum, IsString, IsUUID, ValidateIf } from "class-validator";
import { NotificationType } from "./enums/notifications.enum";
import { User } from "../users/entities/users.entity";

export class CreateNotificationDto {
  @IsUUID()
  userId: string;

  @ValidateIf((o) => o.actorId)
  actor: User;

  @IsString()
  content: string;

  @IsEnum(NotificationType)
  type: NotificationType;

  @ValidateIf((o) => o.postId)
  @IsUUID()
  postId?: string;

  @ValidateIf((o) => o.commentId)
  @IsUUID()
  commentId?: string;
}
