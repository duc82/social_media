import {
  acceptFriendRequest,
  declineFriendRequest,
} from "@/app/actions/userAction";
import { FullUser } from "@/app/types/user";
import handlingError from "@/app/utils/error";
import formatName from "@/app/utils/formatName";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { PersonCheckFill, PersonXFill } from "react-bootstrap-icons";
import toast from "react-hot-toast";

export default function RequestItem(friend: FullUser) {
  const [status, setStatus] = useState<"" | "accept" | "decline">("");
  const [isLoading, setIsLoading] = useState({
    accept: false,
    decline: false,
  });
  const { data } = useSession();
  const token = data?.token!;

  const handleAcceptFriendRequest = async () => {
    try {
      setIsLoading((prev) => ({ ...prev, accept: true }));
      await acceptFriendRequest(token, friend.id);
      setStatus("accept");
    } catch (error) {
      toast.error(handlingError(error));
    } finally {
      setIsLoading((prev) => ({ ...prev, accept: false }));
    }
  };

  const handleDeclineFriendRequest = async () => {
    try {
      setIsLoading((prev) => ({ ...prev, decline: true }));
      await declineFriendRequest(token, friend.id);
      setStatus("decline");
    } catch (error) {
      toast.error(handlingError(error));
    } finally {
      setIsLoading((prev) => ({ ...prev, decline: false }));
    }
  };

  const fullName = formatName(friend.firstName, friend.lastName);

  return (
    <div className="col-12 col-md-6 col-lg-4 col-xl-3">
      <div className="card h-100">
        <Link href={`/profile/${friend.id}`} className="d-block">
          <Image
            src={friend.profile.avatar}
            alt={fullName}
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
            <h5 className="mb-0">{fullName}</h5>
          </Link>
          <p className="card-text mb-2">{friend.profile.bio}</p>
          <div className="d-flex flex-column">
            {!status ? (
              <>
                <button
                  type="button"
                  className="btn btn-success mb-2 d-flex justify-content-center align-items-center"
                  disabled={isLoading.accept}
                  onClick={handleAcceptFriendRequest}
                >
                  {isLoading.accept ? (
                    <div
                      className="spinner-border spinner-border-sm text-white"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  ) : (
                    <PersonCheckFill size={16} />
                  )}

                  <span className="ms-2">Accept</span>
                </button>
                <button
                  type="button"
                  className="btn btn-danger mb-2 d-flex justify-content-center align-items-center"
                  disabled={isLoading.decline}
                  onClick={handleDeclineFriendRequest}
                >
                  {isLoading.decline ? (
                    <div
                      className="spinner-border spinner-border-sm text-white"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  ) : (
                    <PersonXFill size={16} />
                  )}

                  <span className="ms-2">Decline</span>
                </button>
              </>
            ) : (
              <button
                type="button"
                className="btn btn-secondary cursor-not-allowed mb-2 d-flex justify-content-center align-items-center"
                disabled
              >
                {status === "accept" ? "Request accepted" : "Request deleted"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
