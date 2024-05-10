"use client";
import Link from "next/link";
import Avatar from "../../Avatar";
import { FullUser } from "@/app/types/user";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { faPlus, faUserCheck } from "@fortawesome/free-solid-svg-icons";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import handlingError from "@/app/utils/error";
import {
  cancelFriendRequest,
  sendFriendRequest
} from "@/app/actions/userAction";

export default function SuggestionItemSidebar(friend: FullUser) {
  const [isSendRequest, setIsSendRequest] = useState(false);
  const { data } = useSession();
  const accessToken = data?.accessToken!;

  const handleSendFriendRequest = async () => {
    try {
      await sendFriendRequest(accessToken, friend.id);
      setIsSendRequest(true);
    } catch (error) {
      toast.error(handlingError(error));
    }
  };

  const handleCancelFriendRequest = async () => {
    try {
      await cancelFriendRequest(accessToken, friend.id);
      setIsSendRequest(false);
    } catch (error) {
      toast.error(handlingError(error));
    }
  };

  return (
    <div className="hstack gap-2 mb-3">
      <div className="avatar">
        <Link href={`/profile/${friend.id}`}>
          <Avatar
            className="avatar-img rounded-circle"
            src={friend.profile.avatar}
            alt={friend.fullName}
          />
        </Link>
      </div>
      <div className="overflow-hidden">
        <Link className="h6 mb-0 text-truncate" href={`/profile/${friend.id}`}>
          {friend.fullName}
        </Link>
        <p className="mb-0 small text-truncate">{friend.profile.overview}</p>
      </div>
      <button
        type="button"
        className={clsx(
          "btn rounded-circle icon-md ms-auto",
          isSendRequest ? "btn-primary" : "btn-primary-soft"
        )}
        onClick={
          isSendRequest ? handleCancelFriendRequest : handleSendFriendRequest
        }
      >
        <FontAwesomeIcon icon={isSendRequest ? faUserCheck : faPlus} />
      </button>
    </div>
  );
}
