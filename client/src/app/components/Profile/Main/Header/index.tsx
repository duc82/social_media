"use client";
import Avatar from "@/app/components/Avatar";
import Image from "next/image";
import Link from "next/link";
import {
  Briefcase,
  Calendar2Plus,
  ChatLeftTextFill,
  GeoAlt,
  PatchCheckFill,
  PencilFill,
  PersonCheckFill,
  PersonPlusFill,
  PersonXFill,
  PlusLg,
} from "react-bootstrap-icons";
import ProfileMainHeaderMenu from "./Menu";
import { Friendship, FullUser } from "@/app/types/user";
import useFriends from "@/app/hooks/useFriends";
import { formatDate } from "@/app/utils/dateTime";
import { useState } from "react";
import toast from "react-hot-toast";
import handlingError from "@/app/utils/error";
import userService from "@/app/services/userService";

export default function ProfileMainHeader({
  accessToken,
  user,
  isMyProfile,
  friendship,
  initialSentFriendRequest,
}: {
  accessToken: string;
  user: FullUser;
  isMyProfile: boolean;
  friendship: Friendship | null;
  initialSentFriendRequest: boolean;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSentFriendRequest, setIsSentFriendRequest] = useState(
    initialSentFriendRequest
  );
  const [isFriend, setIsFriend] = useState(friendship?.status === "accepted");
  const { total: totalFriends } = useFriends((state) => state);

  const handleSendFriendRequest = async () => {
    try {
      setIsLoading(true);
      await userService.sendFriendRequest(accessToken, user.id);
      setIsSentFriendRequest(true);
    } catch (error) {
      toast.error(handlingError(error));
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelFriendRequest = async () => {
    try {
      setIsLoading(true);
      await userService.cancelFriendRequest(accessToken, user.id);
      setIsSentFriendRequest(false);
    } catch (error) {
      toast.error(handlingError(error));
    } finally {
      setIsLoading(false);
    }
  };

  const handleAcceptFriendRequest = async () => {
    try {
      setIsLoading(true);
      await userService.acceptFriendRequest(accessToken, user.id);
      setIsFriend(true);
    } catch (error) {
      toast.error(handlingError(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card">
      <div style={{ height: "200px" }}>
        <Link
          href={user.profile.wallpaper ?? "/wallpaper.jpg"}
          className="d-block h-100 position-relative"
          data-glightbox
          data-gallery="wallpaper"
        >
          <Image
            src={user.profile.wallpaper ?? "/wallpaper.jpg"}
            fill
            alt="Wallpaper"
            className="rounded-top object-fit-cover"
          />
        </Link>
      </div>

      <div className="card-body py-0">
        <div className="d-md-flex align-items-start text-center text-md-start">
          <Avatar
            src={user.profile.avatar}
            alt={user.fullName}
            wrapperClassName="avatar avatar-xxl mt-n5 mb-3"
            className="rounded-circle border border-3 border-white "
          />

          <div className="ms-md-4 mt-md-3">
            <h1 className="mb-0 h5">
              {user.fullName} <PatchCheckFill className="text-success small" />
            </h1>
            <p>{totalFriends} friends</p>
          </div>

          {isMyProfile ? (
            <div className="d-flex mt-3 justify-content-center ms-md-auto">
              <button
                type="button"
                className="btn btn-primary-soft d-flex align-items-center me-2"
              >
                <PlusLg className="me-2" />
                Add to story
              </button>
              <button
                type="button"
                className="btn btn-danger-soft d-flex align-items-center me-2"
              >
                <PencilFill className="me-2" />
                Edit profile
              </button>
              <div className="dropdown">
                <button
                  type="button"
                  className="icon-md btn btn-light"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="bi bi-three-dots"></i>
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <Link className="dropdown-item" href="#">
                      <i className="bi bi-bookmark fa-fw pe-2"></i>Share profile
                      in a message
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" href="#">
                      <i className="bi bi-file-earmark-pdf fa-fw pe-2"></i>Save
                      your profile to PDF
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" href="#">
                      <i className="bi bi-lock fa-fw pe-2"></i>Lock profile
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link className="dropdown-item" href="#">
                      <i className="bi bi-gear fa-fw pe-2"></i>Profile settings
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="d-flex mt-3 justify-content-center ms-md-auto">
              {isFriend && (
                <button
                  type="button"
                  className="btn btn-primary d-flex align-items-center me-2"
                >
                  <PersonCheckFill width={16} height={16} className="me-2" />
                  <span>Friends</span>
                </button>
              )}

              {!isFriend && friendship?.user.id === user.id && (
                <button
                  type="button"
                  className="btn btn-success d-flex align-items-center me-2"
                  onClick={handleAcceptFriendRequest}
                >
                  {isLoading ? (
                    <div
                      className="spinner-border spinner-border-sm text-white"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  ) : (
                    <PersonCheckFill width={16} height={16} className="me-2" />
                  )}
                  <span>Accept</span>
                </button>
              )}

              {!isFriend && isSentFriendRequest ? (
                <button
                  type="button"
                  className="btn btn-primary d-flex align-items-center me-2"
                  onClick={handleCancelFriendRequest}
                >
                  {isLoading ? (
                    <div
                      className="spinner-border spinner-border-sm text-white"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  ) : (
                    <PersonXFill width={16} height={16} className="me-2" />
                  )}
                  <span>Cancel Request</span>
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-primary d-flex align-items-center me-2"
                  onClick={handleSendFriendRequest}
                >
                  {isLoading ? (
                    <div
                      className="spinner-border spinner-border-sm text-white"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  ) : (
                    <PersonPlusFill width={16} height={16} />
                  )}
                  <span className="ms-2">Add friend</span>
                </button>
              )}
              <button
                type="button"
                className="btn btn-success-soft d-flex align-items-center me-2"
              >
                <ChatLeftTextFill width={16} height={16} className="me-2" />
                <span>Message</span>
              </button>
              <div className="dropdown">
                <button
                  type="button"
                  className="icon-md btn btn-light"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="bi bi-three-dots"></i>
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <Link className="dropdown-item" href="#">
                      <i className="bi bi-bookmark fa-fw pe-2"></i>Share profile
                      in a message
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" href="#">
                      <i className="bi bi-file-earmark-pdf fa-fw pe-2"></i>Save
                      your profile to PDF
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" href="#">
                      <i className="bi bi-lock fa-fw pe-2"></i>Lock profile
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link className="dropdown-item" href="#">
                      <i className="bi bi-gear fa-fw pe-2"></i>Profile settings
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>

        <ul className="list-inline mb-0 text-center text-md-start mt-3 mt-md-0">
          <li className="list-inline-item d-inline-flex align-items-center">
            <Briefcase className="me-1" /> {user.profile.job ?? "Web Developer"}
          </li>
          <li className="list-inline-item d-inline-flex align-items-center">
            <GeoAlt className="me-1" />{" "}
            {user.profile.location ?? "New Hampshire"}
          </li>
          <li className="list-inline-item d-inline-flex align-items-center">
            <Calendar2Plus className="me-1" /> Joined on{" "}
            {formatDate(user.createdAt)}
          </li>
        </ul>
      </div>

      <div className="card-footer mt-3 pt-2 pb-0">
        <ProfileMainHeaderMenu />
      </div>
    </div>
  );
}
