import {
  IsArray,
  IsEnum,
  IsOptional,
  IsString,
  ValidateIf,
} from "class-validator";
import { Audience } from "../entities/post.entity";
import { QueryDto } from "src/dto/query.dto";
import { PickType } from "@nestjs/swagger";
import { File } from "../entities/file.entity";
import { Type } from "class-transformer";

class FileUpload extends PickType(File, ["url", "type"]) {}

export class CreatePostDto {
  @ValidateIf((o) => o.content)
  @IsString()
  content: string;

  @IsEnum(Audience)
  audience: Audience;

  @IsArray()
  @Type(() => FileUpload)
  files: FileUpload[];
}

export class ListAllPostsDto extends QueryDto {
  @IsOptional()
  @IsString()
  userId?: string;
}
