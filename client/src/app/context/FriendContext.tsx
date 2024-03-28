import { createContext } from "react";
import { FriendStore } from "../stores/FriendStore";

const FriendContext = createContext<FriendStore | null>(null);

export default FriendContext;
