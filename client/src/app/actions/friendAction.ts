import userService from "../services/userService";

const friendAction = {
  getFriendship: async (accessToken: string, friendId: string) => {
    try {
      const friendShip = await userService.getFriendship(accessToken, friendId);
      return friendShip;
    } catch (error) {
      return null;
    }
  },
};

export default friendAction;
