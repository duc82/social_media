import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  ValidateIf,
} from "class-validator";
import { CallStatus, CallType } from "./enums/calls.enum";

export class CreateMessageDto {
  @ValidateIf((o) => o.content)
  @IsString()
  content?: string;

  @IsNotEmpty()
  @IsUUID()
  conversation: string;

  @ValidateIf((o) => o.callType)
  @IsEnum(CallType)
  callType?: CallType;

  @ValidateIf((o) => o.callStatus)
  @IsEnum(CallStatus)
  callStatus?: CallStatus;

  @ValidateIf((o) => o.callerId)
  @IsUUID()
  callerId?: string;

  @ValidateIf((o) => o.calleeId)
  @IsUUID()
  calleeId?: string;

  @ValidateIf((o) => o.callDuration)
  @IsNumber()
  callDuration?: number;
}
