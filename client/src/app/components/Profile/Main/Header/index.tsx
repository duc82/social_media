"use client";
import Avatar from "@/app/components/Avatar";
import Image from "next/image";
import Link from "next/link";
import {
  Bookmark,
  Briefcase,
  Calendar2Plus,
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
import { Friendship, FullUser } from "@/app/types/user";
import { formatDate } from "@/app/utils/dateTime";
import { useMemo, useState } from "react";
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

export default function ProfileMainHeader({
  user,
  currentUser,
  initialTotalFriends,
  initialFriendship,
}: {
  user: FullUser;
  initialFriendship: Friendship | null;
  currentUser: FullUser;
  initialTotalFriends: number;
}) {
  const [friendship, setFriendship] = useState(initialFriendship);
  const [totalFriends, setTotalFriends] = useState(initialTotalFriends);
  const [isLoading, setIsLoading] = useState(false);
  const { data } = useSession();
  const accessToken = data?.accessToken!;

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

  const handleSendFriendRequest = async () => {
    try {
      setIsLoading(true);
      const friendship = await sendFriendRequest(accessToken, user.id);
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
      const friendship = await cancelFriendRequest(accessToken, user.id);
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
      const friendship = await acceptFriendRequest(accessToken, user.id);
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
      const friendship = await declineFriendRequest(accessToken, user.id);
      setFriendship(friendship);
    } catch (error) {
      toast.error(handlingError(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card">
      <Fancybox style={{ height: "200px" }}>
        <Link
          href="/wallpaper.jpg"
          data-fancybox="wallpaper"
          className="d-block h-100 position-relative"
        >
          <Image
            src="/wallpaper.jpg"
            fill
            alt="Wallpaper"
            className="rounded-top object-fit-cover"
          />
        </Link>
      </Fancybox>

      <div className="card-body py-0">
        <div className="d-md-flex align-items-start text-center text-md-start">
          <Fancybox>
            <Link href={user.profile.avatar} data-fancybox="avatar">
              <Avatar
                src={user.profile.avatar}
                wrapperClassName="avatar-xxl mt-n5 mb-3"
                className="rounded-circle border border-3 border-white"
              />
            </Link>
          </Fancybox>

          <div className="ms-md-4 mt-md-3">
            <h1 className="mb-0 h5">
              {user.fullName} <PatchCheckFill className="text-success small" />
            </h1>
            <p>{totalFriends} friends</p>
          </div>

          {isMyProfile && (
            <div className="d-flex flex-wrap gap-2 mt-3 justify-content-center ms-md-auto">
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
                    <Link className="dropdown-item" href="#">
                      <Gear width={23} height={19} className="pe-2" />
                      Profile settings
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {!isMyProfile && (
            <div className="d-flex flex-wrap gap-2 mt-3 justify-content-center ms-md-auto">
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

              <Link
                href="/chats"
                className="btn btn-light d-flex align-items-center"
              >
                <ChatLeftTextFill width={16} height={16} className="me-2" />
                <span>Message</span>
              </Link>

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
          <li className="list-inline-item d-inline-flex align-items-center">
            <Briefcase className="me-1" /> {"Web Developer"}
          </li>
          <li className="list-inline-item d-inline-flex align-items-center">
            <GeoAlt className="me-1" /> {"New Hampshire"}
          </li>
          <li className="list-inline-item d-inline-flex align-items-center">
            <Calendar2Plus className="me-1" /> Joined on{" "}
            {formatDate(Date.now(), { dateStyle: "medium" })}
          </li>
        </ul>
      </div>

      <div className="card-footer mt-3 pt-2 pb-0">
        <ProfileMainHeaderMenu />
      </div>
    </div>
  );
}
