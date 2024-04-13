import { useContext } from "react";
import { FriendState } from "../stores/FriendStore";
import FriendContext from "../contexts/FriendContext";
import { useStore } from "zustand";

export default function useFriends<T>(selector: (state: FriendState) => T): T {
  const store = useContext(FriendContext);

  if (!store) {
    throw new Error("useFriend must be used within a FriendProvider");
  }

  return useStore(store, selector);
}
