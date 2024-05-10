"use client";

import { useState } from "react";
import FriendContext from "../contexts/FriendContext";
import { Friendship, FullUser } from "../types/user";
import { useSession } from "next-auth/react";
import userService from "../services/userService";
import toast from "react-hot-toast";
import handlingError from "../utils/error";

interface FriendProviderProps {
  children: React.ReactNode;
  initialFriends: FullUser[];
  initialFriendship: Friendship | null;
}

export default function FriendProvider({
  children,
  initialFriends,
  initialFriendship,
}: FriendProviderProps) {
  const [friends, setFriends] = useState<FullUser[]>(initialFriends);
  const [friendship, setFriendship] = useState<Friendship | null>(
    initialFriendship
  );
  const [isLoading, setIsLoading] = useState(false);
  const { data } = useSession();
  const accessToken = data?.accessToken!;

  const sendFriendRequest = async (friendId: string) => {
    try {
      setIsLoading(true);
      const friendship = await userService.sendFriendRequest(
        accessToken,
        friendId
      );
      setFriendship(friendship);
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
      setFriendship(null);
    } catch (error) {
      toast.error(handlingError(error));
    } finally {
      setIsLoading(false);
    }
  };

  const acceptFriendRequest = async (friendId: string) => {
    try {
      setIsLoading(true);
      const friendship = await userService.acceptFriendRequest(
        accessToken,
        friendId
      );
      setFriendship(friendship);
    } catch (error) {
      toast.error(handlingError(error));
    } finally {
      setIsLoading(false);
    }
  };

  const declineFriendRequest = async (friendId: string) => {
    try {
      setIsLoading(true);
      const friendship = await userService.declineFriendRequest(
        accessToken,
        friendId
      );
      setFriendship(friendship);
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
        friendship,
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
