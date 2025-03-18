"use client";
import Fancybox from "@/app/libs/FancyBox";
import { FullUser } from "@/app/types/user";
import Image from "next/image";
import Link from "next/link";

import Avatar from "../Avatar";
import { directMessage } from "@/app/actions/conversationAction";
import { useRouter } from "next-nprogress-bar";

interface ProfileModalProps {
  user?: FullUser;
}

export default function ProfileModal({ user }: ProfileModalProps) {
  const router = useRouter();

  const handleMessage = async () => {
    if (!user) return;
    try {
      const conversation = await directMessage(user.id);
      router.push(`/messages/${conversation.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="modal fade" id="profileModal">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Account information</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body p-0">
            {user?.profile.wallpaper && (
              <Fancybox style={{ height: 170 }}>
                <Link
                  href={user?.profile.wallpaper}
                  data-fancybox
                  data-caption={user.fullName}
                  className="d-block h-100 position-relative"
                >
                  <Image
                    src={user?.profile.wallpaper}
                    alt="Wallpaper"
                    className="object-fit-cover"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </Link>
              </Fancybox>
            )}
            <div className="px-3">
              <Fancybox className="d-flex align-items-center text-center text-md-start mt-n3 mb-3">
                <Link
                  href={user?.profile.avatar || ""}
                  data-fancybox
                  data-caption={user?.fullName}
                  className="d-flex avatar avatar-xl"
                >
                  <Avatar
                    src={user?.profile.avatar || ""}
                    className="rounded-circle border border-3 border-white"
                  />
                </Link>
                <div className="ms-2">
                  <h1 className="mb-0 h5">
                    {user?.fullName}{" "}
                    <i className="bi bi-patch-check-fill text-success small"></i>
                  </h1>
                </div>
              </Fancybox>
              <button
                type="button"
                onClick={handleMessage}
                className="btn btn-primary-soft w-100 btn-sm"
                data-bs-dismiss="modal"
              >
                Message
              </button>
            </div>
            <hr />
            <div className="px-3"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
