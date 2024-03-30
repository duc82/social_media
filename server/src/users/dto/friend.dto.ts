import { IsEnum, IsNotEmpty } from "class-validator";
import { FriendshipStatus } from "../interfaces/friendship.interface";

export class GetFriendsParams {
  @IsNotEmpty()
  id: string;

  @IsEnum(FriendshipStatus)
  status: FriendshipStatus;
}
