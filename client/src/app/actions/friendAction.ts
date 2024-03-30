import userService from "../services/userService";
import { FriendshipStatus } from "../types/user";

const friendAction = {
  getFriendship: async (
    accessToken: string,
    friendId: string,
    status: FriendshipStatus
  ) => {
    try {
      const friendShip = await userService.getFriendship(
        accessToken,
        friendId,
        status
      );
      return friendShip;
    } catch (error) {
      return null;
    }
  },
};

export default friendAction;
