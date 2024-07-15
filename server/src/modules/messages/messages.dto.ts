import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
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
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsOptional()
  @IsBoolean()
  seen: boolean;

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
