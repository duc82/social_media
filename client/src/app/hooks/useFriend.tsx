import { useContext } from "react";
import { FriendState } from "../stores/FriendStore";
import FriendContext from "../context/FriendContext";
import { useStore } from "zustand";

function useFriends<T>(selector: (state: FriendState) => T): T {
  const store = useContext(FriendContext);

  if (!store) {
    throw new Error("useFriend must be used within a FriendProvider");
  }

  return useStore(store, selector);
}

export default useFriends;
