"use server";

import userService, { GetFriendsOptions } from "../services/userService";
import { FriendStatus, FullUser } from "../types/user";
import { revalidatePath as revalidatePathCustom } from "next/cache";

export const getUserById = async (
  id: string | undefined,
  currentUser: FullUser
) => {
  if (!id) {
    return currentUser;
  }

  if (currentUser.id === id) {
    return currentUser;
  }

  const user = await userService.getUserProfile(id);
  return user;
};

export const revalidatePath = (
  originalPath: string,
  type?: "page" | "layout" | undefined
) => {
  revalidatePathCustom(originalPath, type);
};

export const getFriendship = async (accessToken: string, userId: string) => {
  try {
    const friendShip = await userService.getFriendship(accessToken, userId);
    return friendShip;
  } catch (error) {
    return null;
  }
};

export const getFriends = async (
  accessToken: string,
  status: FriendStatus,
  options?: GetFriendsOptions
) => {
  return userService.getFriends(accessToken, status, options);
};

export const getFriendRequests = async (
  accessToken: string,
  options: GetFriendsOptions
) => {
  return userService.getFriendRequests(accessToken, options);
};

export const sendFriendRequest = async (
  accessToken: string,
  friendId: string
) => {
  const friendship = await userService.sendFriendRequest(accessToken, friendId);
  return friendship;
};

export const cancelFriendRequest = async (
  accessToken: string,
  friendId: string
) => {
  await userService.cancelFriendRequest(accessToken, friendId);
  return null;
};

export const acceptFriendRequest = async (
  accessToken: string,
  friendId: string
) => {
  const friendship = await userService.acceptFriendRequest(
    accessToken,
    friendId
  );
  return friendship;
};

export const declineFriendRequest = async (
  accessToken: string,
  friendId: string
) => {
  const friendship = await userService.declineFriendRequest(
    accessToken,
    friendId
  );
  return friendship;
};
