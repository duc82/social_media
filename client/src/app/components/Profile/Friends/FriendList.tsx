"use client";

import Link from "next/link";
import React, { useState } from "react";
import Avatar from "../../Avatar";
import { FullUser } from "@/app/types/user";
import userService from "@/app/services/userService";
import { useSession } from "next-auth/react";
import { useRouter } from "next-nprogress-bar";

export default function FriendList({
  initialFriends,
  isLoadMore,
}: {
  initialFriends: FullUser[];
  isLoadMore: boolean;
}) {
  const [friends, setFriends] = useState<FullUser[]>(initialFriends);
  const { data: session } = useSession();
  const router = useRouter();

  const handleRemoveFriend = async (id: string) => {
    if (!session?.token) return;
    try {
      await userService.removeFriend(id, session.token);
      setFriends((prevFriends) =>
        prevFriends.filter((friend) => friend.id !== id)
      );
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {friends.length > 0 ? (
        <>
          {friends.map((friend) => {
            return (
              <div
                key={friend.id}
                className="d-md-flex align-items-center mb-4"
              >
                <Link
                  href={`/profile/${friend.username}`}
                  className="avatar me-3 mb-3 mb-md-0"
                >
                  <Avatar
                    className="avatar-img rounded-circle"
                    src={friend.profile.avatar}
                    alt={friend.fullName}
                  />
                </Link>

                <div className="w-100">
                  <div className="d-sm-flex align-items-start">
                    <Link
                      href={`/profile/${friend.username}`}
                      className="h6 mb-0"
                    >
                      {friend.fullName}
                    </Link>

                    {friend.profile.job && (
                      <p className="small ms-sm-2 mb-0">{friend.profile.job}</p>
                    )}
                  </div>

                  <ul className="avatar-group mt-1 list-unstyled align-items-sm-center mb-0">
                    <li className="small">
                      Samuel Bishop, Judy Nguyen, and 115 other shared
                      connections
                    </li>
                  </ul>
                </div>

                <div className="ms-md-auto d-flex">
                  <button
                    type="button"
                    className="btn btn-danger-soft btn-sm mb-0 me-2"
                    onClick={() => handleRemoveFriend(friend.id)}
                  >
                    Remove
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary-soft btn-sm mb-0"
                  >
                    Message
                  </button>
                </div>
              </div>
            );
          })}
          {isLoadMore && (
            <button
              type="button"
              className="btn btn-sm btn-loader btn-primary-soft d-flex w-100 justify-content-center"
              data-bs-toggle="button"
            >
              <span className="load-text"> Load more connections </span>
              {/* <div className="load-icon">
              <div className="spinner-grow spinner-grow-sm" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div> */}
            </button>
          )}
        </>
      ) : (
        <p className="mb-0">
          You don&apos;t have any friends yet.{" "}
          <Link href="/friends/suggestions">Find new friends</Link>
        </p>
      )}
    </>
  );
}
