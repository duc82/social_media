import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  IsUrl,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";
import { FileType } from "src/interfaces/file.interface";

class MessageFileDto {
  @IsUrl()
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
  files: MessageFileDto[];

  @IsUUID()
  @IsNotEmpty()
  conversation: string;

  @IsUUID()
  @IsNotEmpty()
  user: string;
}
