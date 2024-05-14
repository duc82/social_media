"use client";

import { directMessage } from "@/app/actions/conversationAction";
import { sendFriendRequest } from "@/app/actions/userAction";
import userService from "@/app/services/userService";
import { FullUser } from "@/app/types/user";
import handlingError from "@/app/utils/error";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ChatLeftTextFill,
  PersonPlusFill,
  PersonXFill,
} from "react-bootstrap-icons";
import toast from "react-hot-toast";

export default function SuggesstionItem(friend: FullUser) {
  const [status, setStatus] = useState<"" | "send" | "cancel">("");
  const [isLoading, setIsLoading] = useState(false);
  const { data } = useSession();
  const accessToken = data?.accessToken!;

  const handleSendFriendRequest = async () => {
    try {
      setIsLoading(true);
      await sendFriendRequest(accessToken, friend.id);
      setStatus("send");
    } catch (error) {
      toast.error(handlingError(error));
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelFriendRequest = async () => {
    try {
      setIsLoading(true);
      await userService.cancelFriendRequest(accessToken, friend.id);
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
        <div className="card-body p-3 d-flex flex-column justify-content-between">
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
              <button
                type="button"
                className="btn btn-danger mb-2 d-flex justify-content-center align-items-center"
                onClick={handleCancelFriendRequest}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div
                    className="spinner-border spinner-border-sm text-white"
                    role="status"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  <PersonXFill size={16} />
                )}

                <span className="ms-2">Cancel</span>
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-primary mb-2 d-flex justify-content-center align-items-center"
                onClick={handleSendFriendRequest}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div
                    className="spinner-border spinner-border-sm text-white"
                    role="status"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  <PersonPlusFill size={16} />
                )}

                <span className="ms-2">Add friend</span>
              </button>
            )}
            <button
              type="button"
              onClick={() => directMessage(friend.id, accessToken)}
              className="btn btn-secondary-soft d-flex justify-content-center align-items-center"
            >
              <ChatLeftTextFill size={16} />
              <span className="ms-2">Message</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
