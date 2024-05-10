import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsString,
  IsUUID,
  ValidateIf,
} from "class-validator";

export class CreateConversationDto {
  @ValidateIf((o) => o.name)
  @IsString()
  name?: string;

  @IsBoolean()
  isGroup: boolean;

  @IsUUID(undefined, { each: true })
  @ArrayMinSize(1)
  @IsArray()
  users: string[];
}
