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
import { PostFile } from "../entities/post_file.entity";
import { Type } from "class-transformer";

class PostFileUpload extends PickType(PostFile, ["url", "type"]) {}

export class CreatePostDto {
  @ValidateIf((o) => o.content)
  @IsString()
  content: string;

  @IsEnum(Audience)
  audience: Audience;

  @IsArray()
  @Type(() => PostFileUpload)
  files: PostFileUpload[];
}

export class ListAllPostsDto extends QueryDto {
  @IsOptional()
  @IsString()
  userId?: string;
}
