import { ValidateIf } from "class-validator";

export class CreateGroupDto {
  @ValidateIf((o) => o.name)
  name: string;
}
