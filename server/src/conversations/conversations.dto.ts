import {
  ArrayMaxSize,
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
  @ValidateIf((o) => !o.isGroup)
  @ArrayMaxSize(2, {
    message: "Users array must have at most 2 elements when isGroup is false",
  })
  users: string[];
}
