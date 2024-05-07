import { createContext } from "react";
import { Friendship, FullUser } from "../types/user";

interface FriendContextState {
  friends: FullUser[];
  friendship: Friendship | null;
  isLoading: boolean;
  sendFriendRequest: (friendId: string) => Promise<void>;
  cancelFriendRequest: (friendId: string) => Promise<void>;
  acceptFriendRequest: (friendId: string) => Promise<void>;
  declineFriendRequest: (friendId: string) => Promise<void>;
}

const FriendContext = createContext<FriendContextState>({
  friends: [],
  friendship: null,
  isLoading: false,
  sendFriendRequest: async () => {},
  cancelFriendRequest: async () => {},
  acceptFriendRequest: async () => {},
  declineFriendRequest: async () => {},
});

export default FriendContext;
