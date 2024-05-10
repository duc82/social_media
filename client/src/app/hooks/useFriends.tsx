import { useContext } from "react";
import FriendContext from "../contexts/FriendContext";

export default function useFriends() {
  return useContext(FriendContext);
}
