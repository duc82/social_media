"use server";

import userService from "../services/userService";

export const getFriendship = async (accessToken: string, friendId: string) => {
  try {
    const friendShip = await userService.getFriendship(accessToken, friendId);
    return friendShip;
  } catch (error) {
    return null;
  }
};

export const sendFriendRequest = async (
  accessToken: string,
  friendId: string
) => {
  try {
    const friendship = await userService.sendFriendRequest(
      accessToken,
      friendId
    );
    return friendship;
  } catch (error) {
    throw error;
  }
};

export const cancelFriendRequest = async (
  accessToken: string,
  friendId: string
) => {
  try {
    await userService.cancelFriendRequest(accessToken, friendId);
    return null;
  } catch (error) {
    throw error;
  }
};
