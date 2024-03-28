"use client";

import { PropsWithChildren, useRef } from "react";
import createFriendStore, {
  FriendProps,
  FriendStore,
} from "../stores/FriendStore";
import FriendContext from "../context/FriendContext";

type FriendProviderProps = PropsWithChildren<FriendProps>;

const FriendProvider = ({ children, ...props }: FriendProviderProps) => {
  const storeRef = useRef<FriendStore>();

  if (!storeRef.current) {
    storeRef.current = createFriendStore(props);
  }

  return (
    <FriendContext.Provider value={storeRef.current}>
      {children}
    </FriendContext.Provider>
  );
};

export default FriendProvider;
