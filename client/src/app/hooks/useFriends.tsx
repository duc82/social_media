import { useContext } from "react";
import { FriendContext } from "../providers/FriendProvider";

export default function useFriends() {
  return useContext(FriendContext);
}
