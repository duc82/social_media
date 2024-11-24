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
  @ArrayMinSize(1)
  @IsArray()
  @ArrayMinSize(2, {
    message: "Members must be at least 2",
  })
  members: string[];
}

export class CreateConversationWithMessageDto extends IntersectionType(
  CreateConversationDto,
  OmitType(CreateMessageDto, ["conversation"]),
) {}
