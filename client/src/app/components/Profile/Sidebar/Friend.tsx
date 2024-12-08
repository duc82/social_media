"use client";
import { FullUser } from "@/app/types/user";
import Link from "next/link";
import Avatar from "../../Avatar";

import { useSession } from "next-auth/react";
import userService from "@/app/services/userService";
import { useRouter } from "next/navigation";

export default function Friend({ friend }: { friend: FullUser }) {
  const { data: session } = useSession();
  const router = useRouter();

  const handleRemove = async (id: string) => {
    if (!session?.token) return;
    try {
      await userService.removeFriend(id, session.token);
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div key={friend.id} className="col-6">
      <div className="card shadow-none text-center h-100">
        <div className="card-body p-2 pb-0">
          <Link href={`/profile/${friend.id}`} className="avatar avatar-xl">
            <Avatar
              className="avatar-img rounded-circle"
              src={friend.profile.avatar}
              alt={friend.fullName}
            />
          </Link>
          <h6 className="card-title mb-1 mt-3">
            <Link href={`/profile/${friend.id}`}>{friend.fullName}</Link>
          </h6>
          <p className="mb-0 small lh-sm">16 mutual connections</p>
        </div>
        <div className="card-footer p-2 border-0">
          <button
            type="button"
            className="btn btn-sm btn-primary me-1 me-lg-2"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            aria-label="Send message"
            data-bs-original-title="Send message"
          >
            <i className="bi bi-chat-text-left"></i>
          </button>
          <button
            type="button"
            className="btn btn-sm btn-danger"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            aria-label="Remove friend"
            data-bs-original-title="Remove friend"
            onClick={() => handleRemove(friend.id)}
          >
            <i className="bi bi-person-x"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
