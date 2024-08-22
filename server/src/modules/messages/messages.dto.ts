import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  ValidateIf,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";
import { FileType } from "src/enums/file.enum";

class MessageFileDto {
  @IsString()
  url: string;

  @IsEnum(FileType)
  type: FileType;
}

export class CreateMessageDto {
  @ValidateIf((o) => o.content)
  @IsString()
  content: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({
    each: true,
  })
  @Type(() => MessageFileDto)
  files: MessageFileDto[] = [];

  @IsUUID()
  @IsNotEmpty()
  conversation: string;
}
