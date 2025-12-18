import { IsNotEmpty, IsString, IsUUID, ValidateIf } from "class-validator";

export class CreateMessageDto {
  @ValidateIf((o) => o.content)
  @IsString()
  content?: string;

  @IsNotEmpty()
  @IsUUID()
  conversation: string;
}
