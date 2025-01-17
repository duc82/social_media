"use client";

import { FullUser } from "@/app/types/user";
import { useSession } from "next-auth/react";
import InfiniteScroll from "observer-infinite-scroll";
import { useState } from "react";
import RequestItem from "./RequestItem";
import toast from "react-hot-toast";
import handlingError from "@/app/utils/error";
import { getFriendRequests, getFriends } from "@/app/actions/userAction";

interface RequestsProps {
  initialFriends: FullUser[];
  initialPage: number;
  limit: number;
}

export default function FriendRequests({
  initialFriends,
  initialPage,
  limit,
}: RequestsProps) {
  const { data } = useSession();
  const token = data?.token;

  const [friends, setFriends] = useState<FullUser[]>(initialFriends);
  const [hasMore, setHasMore] = useState(
    initialFriends.length <= limit ? false : true
  );
  const [page, setPage] = useState(initialPage + 1);

  const fetchMoreRequest = async () => {
    if (!token) return;
    try {
      const { friends } = await getFriendRequests(token, {
        page,
        limit,
      });

      if (friends.length === 0) {
        setHasMore(false);
        return;
      }

      setPage((prev) => prev + 1);
      setFriends((prev) => [...prev, ...friends]);
    } catch (error) {
      toast.error(handlingError(error));
    }
  };

  return (
    <InfiniteScroll
      fetchMore={fetchMoreRequest}
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
        <RequestItem key={friend.id} {...friend} />
      ))}
    </InfiniteScroll>
  );
}
