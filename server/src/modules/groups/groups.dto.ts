import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsString,
  IsUUID,
  ValidateIf,
} from "class-validator";
import { GroupAccess } from "./groups.interface";

export class CreateGroupDto {
  @IsString()
  name: string;

  @ValidateIf((o) => o.description)
  @IsString()
  description?: string;

  @IsEnum(GroupAccess)
  access: GroupAccess;

  @IsUUID(undefined, { each: true })
  @IsArray()
  @ArrayMinSize(1, {
    message: "Members must be at least 1",
  })
  members: string[];
}
