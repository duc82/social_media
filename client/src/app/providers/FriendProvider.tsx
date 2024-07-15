"use client";

import React, { createContext, useState } from "react";
import { Friend, FullUser } from "../types/user";
import { useSession } from "next-auth/react";
import userService from "../services/userService";
import toast from "react-hot-toast";
import handlingError from "../utils/error";

interface FriendContextState {
  friends: FullUser[];
  friend: Friend | null;
  isLoading: boolean;
  sendFriendRequest: (_friendId: string) => Promise<void>;
  cancelFriendRequest: (_friendId: string) => Promise<void>;
  acceptFriendRequest: (_friendId: string) => Promise<void>;
  declineFriendRequest: (_friendId: string) => Promise<void>;
}

interface FriendProviderProps {
  children: React.ReactNode;
  initialFriends: FullUser[];
  initialFriend: Friend | null;
}

export const FriendContext = createContext<FriendContextState>({
  friends: [],
  friend: null,
  isLoading: false,
  sendFriendRequest: async () => {},
  cancelFriendRequest: async () => {},
  acceptFriendRequest: async () => {},
  declineFriendRequest: async () => {},
});

export function FriendProvider({
  children,
  initialFriends,
  initialFriend,
}: FriendProviderProps) {
  const [friends, setFriends] = useState<FullUser[]>(initialFriends);
  const [friend, setFriend] = useState<Friend | null>(initialFriend);
  const [isLoading, setIsLoading] = useState(false);
  const { data } = useSession();
  const accessToken = data?.accessToken!;

  const sendFriendRequest = async (friendId: string) => {
    try {
      setIsLoading(true);
      const friend = await userService.sendFriendRequest(accessToken, friendId);
      setFriend(friend);
    } catch (error) {
      toast.error(handlingError(error));
    } finally {
      setIsLoading(false);
    }
  };

  const cancelFriendRequest = async (friendId: string) => {
    try {
      setIsLoading(true);
      await userService.cancelFriendRequest(accessToken, friendId);
      setFriend(null);
    } catch (error) {
      toast.error(handlingError(error));
    } finally {
      setIsLoading(false);
    }
  };

  const acceptFriendRequest = async (friendId: string) => {
    try {
      setIsLoading(true);
      const friend = await userService.acceptFriendRequest(
        accessToken,
        friendId
      );
      setFriend(friend);
    } catch (error) {
      toast.error(handlingError(error));
    } finally {
      setIsLoading(false);
    }
  };

  const declineFriendRequest = async (friendId: string) => {
    try {
      setIsLoading(true);
      const friend = await userService.declineFriendRequest(
        accessToken,
        friendId
      );
      setFriend(friend);
    } catch (error) {
      toast.error(handlingError(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FriendContext.Provider
      value={{
        friends,
        friend,
        isLoading,
        sendFriendRequest,
        cancelFriendRequest,
        acceptFriendRequest,
        declineFriendRequest,
      }}
    >
      {children}
    </FriendContext.Provider>
  );
}
