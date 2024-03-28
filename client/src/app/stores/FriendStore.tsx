import { createStore } from "zustand";
import { FullUser } from "../types/user";

export interface FriendProps {
  friends: FullUser[];
  total: number;
  page: number;
  limit: number;
}

export interface FriendState extends FriendProps {
  setFriends: (props: FriendProps) => void;
}

export type FriendStore = ReturnType<typeof createFriendStore>;

const createFriendStore = (initialProps?: Partial<FriendProps>) => {
  return createStore<FriendState>((set) => ({
    friends: [],
    total: 0,
    page: 1,
    limit: 10,
    ...initialProps,
    setFriends: (props) => set(props),
  }));
};

export default createFriendStore;
