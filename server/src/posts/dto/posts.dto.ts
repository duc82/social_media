import { IsEnum, IsString, ValidateIf } from "class-validator";
import { Audience } from "../entities/post.entity";

export class CreatePostDto {
  @ValidateIf((o) => o.content)
  @IsString()
  content: string;

  @IsEnum(Audience)
  audience: Audience;
}
