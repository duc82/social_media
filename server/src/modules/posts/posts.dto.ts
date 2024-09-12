import { IsArray, IsEnum, IsString, ValidateIf } from "class-validator";
import { PartialType } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { PostAccess } from "./enums/posts.enum";

export class CreatePostDto {
  @ValidateIf((o) => o.content)
  @IsString()
  content: string;

  @IsEnum(PostAccess)
  access: PostAccess;

  @ValidateIf((o) => o.feeling)
  @Transform(({ value }) =>
    typeof value === "string" ? JSON.parse(value) : value,
  )
  @IsArray()
  @Type(() => String)
  feeling: string[];

  @ValidateIf((o) => o.activity)
  @Transform(({ value }) =>
    typeof value === "string" ? JSON.parse(value) : value,
  )
  @IsArray()
  @Type(() => String)
  activity: string[];
}

export class UpdatePostDto extends PartialType(CreatePostDto) {}
