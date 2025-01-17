import { IntersectionType, OmitType } from "@nestjs/swagger";
import {
  ArrayMinSize,
  IsArray,
  IsString,
  IsUUID,
  ValidateIf,
} from "class-validator";
import { CreateMessageDto } from "../messages/messages.dto";

export class CreateConversationDto {
  @ValidateIf((o) => o.name)
  @IsString()
  name?: string;

  @IsUUID(undefined, { each: true })
  @IsArray()
  @ArrayMinSize(1, {
    message: "Members must be at least 1",
  })
  members: string[];
}

export class CreateConversationWithMessageDto extends IntersectionType(
  CreateConversationDto,
  OmitType(CreateMessageDto, ["conversation"]),
) {}
