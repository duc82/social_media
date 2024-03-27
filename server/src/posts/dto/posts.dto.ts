import { IsEnum, IsOptional, IsString, ValidateIf } from "class-validator";
import { Audience } from "../entities/post.entity";
import { QueryDto } from "src/dto/query.dto";

export class CreatePostDto {
  @ValidateIf((o) => o.content)
  @IsString()
  content: string;

  @IsEnum(Audience)
  audience: Audience;
}

export class ListAllPostsDto extends QueryDto {
  @IsOptional()
  @IsString()
  userId?: string;
}
