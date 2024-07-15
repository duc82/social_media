import {
  IsArray,
  IsEnum,
  IsOptional,
  IsString,
  ValidateIf,
} from "class-validator";
import { QueryDto } from "src/shared/dto/query.dto";
import { PickType } from "@nestjs/swagger";
import { PostFile } from "./entities/post_files.entity";
import { Type } from "class-transformer";
import { PostAccess } from "./enums/posts.enum";

class PostFileUpload extends PickType(PostFile, ["url", "type"]) {}

export class CreatePostDto {
  @ValidateIf((o) => o.content)
  @IsString()
  content: string;

  @IsEnum(PostAccess)
  access: PostAccess;

  @IsArray()
  @Type(() => PostFileUpload)
  files: PostFileUpload[];
}

export class ListAllPostsDto extends QueryDto {
  @IsOptional()
  @IsString()
  userId?: string;
}
