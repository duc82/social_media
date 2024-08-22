import {
  ArrayMinSize,
  IsArray,
  IsString,
  IsUUID,
  ValidateIf,
} from "class-validator";

export class CreateConversationDto {
  @ValidateIf((o) => o.name)
  @IsString()
  name?: string;

  @ValidateIf((o) => o.image)
  @IsString()
  image?: string;

  @IsUUID(undefined, { each: true })
  @ArrayMinSize(1)
  @IsArray()
  @ArrayMinSize(2, {
    message: "Members must be at least 2",
  })
  members: string[];
}
