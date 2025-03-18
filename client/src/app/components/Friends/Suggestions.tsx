"use client";

import { FullUser } from "@/app/types/user";
import { useState } from "react";
import InfiniteScroll from "observer-infinite-scroll";
import userService from "@/app/services/userService";
import SuggesstionItem from "./SuggesstionItem";

interface SuggestionsProps {
  initialFriends: FullUser[];
  initialPage: number;
  limit: number;
  token: string;
}

export default function Suggestions({
  initialFriends,
  initialPage,
  limit,
  token,
}: SuggestionsProps) {
  const [friends, setFriends] = useState<FullUser[]>(initialFriends);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(initialPage + 1);

  const fetchMoreFriend = async () => {
    try {
      const { friends } = await userService.getSuggestedFriends(token, {
        limit,
        page,
      });

      if (friends.length === 0) {
        setHasMore(false);
        return;
      }

      setPage((prev) => prev + 1);

      setFriends((prev) => [...prev, ...friends]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <InfiniteScroll
      fetchMore={fetchMoreFriend}
      hasMore={hasMore}
      loader={
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      }
      endMessage={<></>}
      className="row gy-4 overflow-hidden"
    >
      {friends.map((friend) => (
        <SuggesstionItem key={friend.id} {...friend} />
      ))}
    </InfiniteScroll>
  );
}
