"use client";
import Avatar from "@/app/components/Avatar";
import Image from "next/image";
import Link from "next/link";
import {
  Bookmark,
  Briefcase,
  Calendar2Plus,
  CameraFill,
  ChatLeftTextFill,
  FileEarmarkPdf,
  Gear,
  GeoAlt,
  Lock,
  PatchCheckFill,
  PencilFill,
  PlusLg,
  ThreeDots,
} from "react-bootstrap-icons";
import ProfileMainHeaderMenu from "./Menu";
import { Friend, FullUser } from "@/app/types/user";
import { formatDate } from "@/app/utils/dateTime";
import { ChangeEvent, useMemo, useState } from "react";
import FriendButton from "./FriendButton";
import Fancybox from "@/app/libs/FancyBox";
import {
  acceptFriendRequest,
  cancelFriendRequest,
  declineFriendRequest,
  sendFriendRequest,
} from "@/app/actions/userAction";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import handlingError from "@/app/utils/error";
import wallpaper_initial from "@/app/assets/images/wallpaper.webp";
import formatName from "@/app/utils/formatName";
import { directMessage } from "@/app/actions/conversationAction";
import userService from "@/app/services/userService";
import { useRouter } from "next/navigation";

export default function ProfileMainHeader({
  user,
  currentUser,
  initialTotalFriends,
  initialFriend,
}: {
  user: FullUser;
  initialFriend: Friend | null;
  currentUser: FullUser;
  initialTotalFriends: number;
}) {
  const [friendship, setFriendship] = useState(initialFriend);
  const [totalFriends, setTotalFriends] = useState(initialTotalFriends);
  const [isLoading, setIsLoading] = useState(false);
  const { data: session, update } = useSession();
  const router = useRouter();
  const token = session?.token!;

  const isSentFriendRequest = useMemo(
    () =>
      friendship?.status === "pending" && friendship.user.id === currentUser.id,
    [friendship, currentUser]
  );

  const isReceivedFriendRequest = useMemo(
    () =>
      friendship?.status === "pending" &&
      friendship.friend.id === currentUser.id,
    [friendship, currentUser]
  );

  const isFriend = useMemo(
    () => friendship?.status === "accepted",
    [friendship]
  );

  const isMyProfile = useMemo(
    () => user.id === currentUser.id,
    [user, currentUser]
  );

  const handleChangeAvatar = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("isAvatar", "true");

    const { user: newUser } = await userService.update(
      user.id,
      formData,
      token
    );
    await update({ ...session, user: newUser });
    router.refresh();
  };

  const handleChangeWallpaper = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("isAvatar", "false");

    const { user: newUser } = await userService.update(
      user.id,
      formData,
      token
    );

    await update({ ...session, user: newUser });
    router.refresh();
  };

  const handleSendFriendRequest = async () => {
    try {
      setIsLoading(true);
      const friendship = await sendFriendRequest(token, user.id);
      setFriendship(friendship);
    } catch (error) {
      toast.error(handlingError(error));
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelFriendRequest = async () => {
    try {
      setIsLoading(true);
      const friendship = await cancelFriendRequest(token, user.id);
      setFriendship(friendship);
    } catch (error) {
      toast.error(handlingError(error));
    } finally {
      setIsLoading(false);
    }
  };

  const handleAcceptFriendRequest = async () => {
    try {
      setIsLoading(true);
      const friendship = await acceptFriendRequest(token, user.id);
      setFriendship(friendship);
      setTotalFriends((prev) => prev + 1);
    } catch (error) {
      toast.error(handlingError(error));
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeclineFriendRequest = async () => {
    try {
      setIsLoading(true);
      const friendship = await declineFriendRequest(token, user.id);
      setFriendship(friendship);
    } catch (error) {
      toast.error(handlingError(error));
    } finally {
      setIsLoading(false);
    }
  };

  const fullName = formatName(user.firstName, user.lastName);

  return (
    <div className="card">
      <Fancybox style={{ height: "200px" }} className="position-relative">
        <Link
          href={user.profile.wallpaper || wallpaper_initial.src}
          className="d-block h-100 position-relative"
          data-fancybox
        >
          <Image
            src={user.profile.wallpaper || wallpaper_initial}
            alt="Wallpaper"
            className="rounded-top object-fit-cover"
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Link>
        <label
          htmlFor="wallpaperPicture"
          className="position-absolute btn btn-light py-1 px-2 d-flex align-items-center gap-2"
          style={{
            bottom: "10px",
            right: "20px",
          }}
        >
          <input
            type="file"
            id="wallpaperPicture"
            onChange={handleChangeWallpaper}
            hidden
          />
          <CameraFill size={16} />
          <span>Edit wallpaper</span>
        </label>
      </Fancybox>

      <div className="card-body py-0">
        <div className="d-md-flex align-items-start text-center text-md-start">
          <Fancybox className="d-inline-block position-relative">
            <Link
              href={user.profile.avatar}
              className="avatar avatar-xxl mt-n5 mb-3"
              data-fancybox
            >
              <Avatar
                src={user.profile.avatar}
                className="rounded-circle border border-3 border-white"
              />
            </Link>

            {isMyProfile && (
              <label
                htmlFor="profilePicture1"
                className="btn btn-light avatar-camera"
              >
                <CameraFill size={16} />
                <input
                  type="file"
                  id="profilePicture1"
                  accept="image/*"
                  onChange={handleChangeAvatar}
                  hidden
                />
              </label>
            )}
          </Fancybox>

          <div className="ms-md-4 mt-md-3">
            <h1 className="mb-0 h5">
              {fullName} <PatchCheckFill className="text-success small" />
            </h1>
            <p>{totalFriends} friends</p>
          </div>

          {isMyProfile && (
            <div className="d-flex flex-wrap justify-content-center gap-2 mt-3 ms-md-auto">
              <button
                type="button"
                className="btn btn-primary-soft d-flex align-items-center"
              >
                <PlusLg width={16} height={16} className="me-2" />
                Add to story
              </button>
              <button
                type="button"
                className="btn btn-danger-soft d-flex align-items-center"
              >
                <PencilFill width={16} height={16} className="me-2" />
                Edit profile
              </button>
              <div className="dropdown">
                <button
                  type="button"
                  className="icon-md btn btn-light p-0"
                  data-bs-toggle="dropdown"
                >
                  <ThreeDots />
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <Link className="dropdown-item" href="#">
                      <Bookmark width={23} height={19} className="pe-2" />
                      Share profile in a message
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" href="#">
                      <FileEarmarkPdf width={23} height={19} className="pe-2" />
                      Save your profile to PDF
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" href="#">
                      <Lock width={23} height={19} className="pe-2" />
                      Lock profile
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link className="dropdown-item" href="/settings">
                      <Gear width={23} height={19} className="pe-2" />
                      Profile settings
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {!isMyProfile && (
            <div className="d-flex flex-wrap justify-content-center gap-2 mt-3 ms-md-auto">
              {!isFriend &&
                !isReceivedFriendRequest &&
                (friendship?.user.id === currentUser.id ||
                  friendship?.status !== "declined") && (
                  <FriendButton
                    isLoading={isLoading}
                    status={isSentFriendRequest ? "cancel" : "none"}
                    onClick={
                      isSentFriendRequest
                        ? handleCancelFriendRequest
                        : handleSendFriendRequest
                    }
                  />
                )}

              {isFriend && (
                <FriendButton
                  isLoading={isLoading}
                  status="friends"
                  onClick={() => {}}
                />
              )}

              {isReceivedFriendRequest && !isFriend && (
                <>
                  <FriendButton
                    isLoading={isLoading}
                    status="accept"
                    onClick={handleAcceptFriendRequest}
                  />
                  <FriendButton
                    isLoading={isLoading}
                    status="decline"
                    onClick={handleDeclineFriendRequest}
                  />
                </>
              )}

              <button
                type="button"
                className="btn btn-light d-flex align-items-center"
                onClick={() => directMessage(user.id)}
              >
                <ChatLeftTextFill width={16} height={16} className="me-2" />
                <span>Message</span>
              </button>

              <div className="dropdown">
                <button
                  type="button"
                  className="icon-md btn btn-light p-0"
                  data-bs-toggle="dropdown"
                >
                  <ThreeDots />
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <Link className="dropdown-item" href="#">
                      <Bookmark width={23} height={19} className="pe-2" />
                      Share profile in a message
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" href="#">
                      <FileEarmarkPdf width={23} height={19} className="pe-2" />
                      Save your profile to PDF
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" href="#">
                      <Lock width={23} height={19} className="pe-2" />
                      Lock profile
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link className="dropdown-item" href="#">
                      <Gear width={23} height={19} className="pe-2" />
                      Profile settings
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>

        <ul className="list-inline mb-0 text-center text-md-start mt-3 mt-md-0">
          {user.profile.job && (
            <li className="list-inline-item d-inline-flex align-items-center">
              <Briefcase className="me-1" /> {user.profile.job}
            </li>
          )}
          {user.profile.address && (
            <li className="list-inline-item d-inline-flex align-items-center">
              <GeoAlt className="me-1" /> {user.profile.address}
            </li>
          )}
          <li className="list-inline-item d-inline-flex align-items-center">
            <Calendar2Plus className="me-1" /> Joined on{" "}
            {formatDate(user.createdAt, { dateStyle: "medium" })}
          </li>
        </ul>
      </div>

      <div className="card-footer mt-3 pt-2 pb-0">
        <ProfileMainHeaderMenu totalFriends={totalFriends} />
      </div>
    </div>
  );
}
