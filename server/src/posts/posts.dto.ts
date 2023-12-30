import { IsUUID } from "class-validator";

export class CreatePostDto {
  content: string;
  imageUrl: string;
  videoUrl: string;
  @IsUUID(4)
  userId: string;
}
