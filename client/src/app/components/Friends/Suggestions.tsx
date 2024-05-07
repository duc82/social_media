"use client";

import { FullUser } from "@/app/types/user";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import InfiniteScroll from "observer-infinite-scroll";
import userService from "@/app/services/userService";
import { getImageBase64 } from "@/app/libs/plaiceholder";
import ImageBlur from "../ImageBlur";

interface SuggestionsProps {
  initialFriends: FullUser[];
  initialPage: number;
  limit: number;
  accessToken: string;
}

export default function Suggestions({
  initialFriends,
  initialPage,
  limit,
  accessToken,
}: SuggestionsProps) {
  const [friends, setFriends] = useState<FullUser[]>(initialFriends);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(initialPage + 1);

  const fetchMoreFriend = async () => {
    try {
      const { friends } = await userService.getSuggestedFriends(accessToken, {
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
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      }
      className="row gy-4 overflow-hidden"
    >
      {friends.map((friend) => (
        <div key={friend.id} className="col-12 col-md-6 col-lg-4 col-xl-3">
          <div className="card">
            <Link href={`/profile/${friend.id}`} className="d-block">
              <ImageBlur
                src={friend.profile.avatar}
                alt={friend.fullName}
                width={0}
                height={0}
                sizes="100vw"
                className="w-100 h-auto rounded-top-2"
              />
            </Link>
            <div className="p-3">
              <Link
                href={`/profile/${friend.id}`}
                className="card-title d-block mb-3"
              >
                <h5 className="mb-0">{friend.fullName}</h5>
              </Link>
              <p className="card-text">{friend.profile.overview}</p>
              <div className="d-flex flex-column justify-content-center">
                <button type="button" className="btn btn-primary-soft mb-2">
                  Add friend
                </button>
                <button className="btn btn-danger-soft">Remove</button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </InfiniteScroll>
  );
}
