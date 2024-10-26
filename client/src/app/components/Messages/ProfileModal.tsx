"use client";
import Fancybox from "@/app/libs/FancyBox";
import { FullUser } from "@/app/types/user";
import Image from "next/image";
import Link from "next/link";
import wallpaper_initial from "@/app/assets/images/wallpaper.jpg";
import formatName from "@/app/utils/formatName";
import Avatar from "../Avatar";
import { directMessage } from "@/app/actions/conversationAction";
import { useRouter } from "next/navigation";

interface ProfileModalProps {
  user?: FullUser;
}

export default function ProfileModal({ user }: ProfileModalProps) {
  const fullName = formatName(user?.firstName || "", user?.lastName || "");
  const router = useRouter();

  const handleMessage = async () => {
    try {
      const conversation = await directMessage(user?.id || "");
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
            <Fancybox style={{ height: 170 }}>
              <Link
                href={user?.profile.wallpaper || wallpaper_initial.src}
                data-fancybox
                data-caption={fullName}
                className="d-block h-100 position-relative"
              >
                <Image
                  src={user?.profile.wallpaper || wallpaper_initial}
                  alt="Wallpaper"
                  className="object-fit-cover"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </Link>
            </Fancybox>

            <div className="px-3">
              <Fancybox className="d-flex align-items-center text-center text-md-start mt-n2 mb-3">
                <Link
                  href={user?.profile.avatar || ""}
                  data-fancybox
                  data-caption={fullName}
                  className="d-flex avatar-xl"
                >
                  <Avatar
                    src={user?.profile.avatar || ""}
                    className="rounded-circle border border-3 border-white"
                  />
                </Link>
                <div className="ms-2">
                  <h1 className="mb-0 h5">
                    {fullName}{" "}
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
