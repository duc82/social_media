"use server";

import { notFound } from "next/navigation";
import userService, { GetFriendsOptions } from "../services/userService";
import { FriendStatus, FullUser } from "../types/user";

export const getUserProfile = async (
  username: string | undefined,
  currentUser: FullUser,
  token: string
) => {
  if (!username) {
    return currentUser;
  }

  if (currentUser.username === username) {
    return currentUser;
  }
  try {
    const user = await userService.getUserProfile(username, token);
    return user;
  } catch (error) {
    notFound();
  }
};

export const getFriend = async (userId: string, token: string) => {
  try {
    const friend = await userService.getFriend(userId, token);
    return friend;
  } catch (error) {
    return null;
  }
};

export const getFriends = async (
  status: FriendStatus,
  token: string,
  options?: GetFriendsOptions
) => {
  return userService.getFriends(status, token, options);
};

export const getFriendRequests = async (
  token: string,
  options: GetFriendsOptions
) => {
  return userService.getFriendRequests(token, options);
};

export const sendFriendRequest = async (token: string, friendId: string) => {
  const friendship = await userService.sendFriendRequest(token, friendId);
  return friendship;
};

export const cancelFriendRequest = async (token: string, friendId: string) => {
  await userService.cancelFriendRequest(token, friendId);
  return null;
};

export const acceptFriendRequest = async (token: string, friendId: string) => {
  const friendship = await userService.acceptFriendRequest(token, friendId);
  return friendship;
};

export const declineFriendRequest = async (token: string, friendId: string) => {
  const friendship = await userService.declineFriendRequest(token, friendId);
  return friendship;
};
