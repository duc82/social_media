"use client";

import { sendFriendRequest } from "@/app/actions/userAction";
import userService from "@/app/services/userService";
import { FullUser } from "@/app/types/user";
import handlingError from "@/app/utils/error";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

export default function SuggesstionItem(friend: FullUser) {
  const [status, setStatus] = useState<"" | "send" | "cancel">("");
  const [isLoading, setIsLoading] = useState(false);
  const { data } = useSession();
  const accessToken = data?.accessToken!;

  const handleSendFriendRequest = async (friendId: string) => {
    try {
      setIsLoading(true);
      await sendFriendRequest(accessToken, friendId);
      setStatus("send");
    } catch (error) {
      toast.error(handlingError(error));
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelFriendRequest = async (friendId: string) => {
    try {
      setIsLoading(true);
      await userService.cancelFriendRequest(accessToken, friendId);
      setStatus("cancel");
    } catch (error) {
      toast.error(handlingError(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="col-12 col-md-6 col-lg-4 col-xl-3">
      <div className="card h-100">
        <Link href={`/profile/${friend.id}`} className="d-block">
          <Image
            src={friend.profile.avatar}
            alt={friend.fullName}
            width={0}
            height={0}
            sizes="100vw"
            className="w-100 h-auto rounded-top-2"
          />
        </Link>
        <div className="card-body p-3">
          <Link
            href={`/profile/${friend.id}`}
            className="card-title d-block mb-2"
          >
            <h5 className="mb-0">{friend.fullName}</h5>
          </Link>
          <p className="card-text mb-2">
            {status === "send" && "Request sent"}
            {status === "cancel" && "Request canceled"}
            {!status && friend.profile.overview}
          </p>
          <div className="d-flex flex-column">
            {status === "send" ? (
              <>
                <button
                  type="button"
                  className="btn btn-secondary mb-2"
                  onClick={() => handleCancelFriendRequest(friend.id)}
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button type="button" className="btn btn-primary-soft">
                  Message
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className="btn btn-primary-soft mb-2"
                  onClick={() => handleSendFriendRequest(friend.id)}
                  disabled={isLoading}
                >
                  Add friend
                </button>
                <button type="button" className="btn btn-danger-soft">
                  Remove
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
