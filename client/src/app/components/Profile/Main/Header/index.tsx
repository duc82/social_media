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
  FileEarmarkPdfFill,
  Gear,
  GeoAlt,
  Lock,
  PatchCheckFill,
  PencilFill,
  PersonCheckFill,
  PersonPlusFill,
  PersonXFill,
  PlusLg,
  ThreeDots,
} from "react-bootstrap-icons";
import ProfileMainHeaderMenu from "./Menu";
import { Friendship, FullUser } from "@/app/types/user";
import useFriends from "@/app/hooks/useFriends";
import { formatDate } from "@/app/utils/dateTime";
import { useState } from "react";
import toast from "react-hot-toast";
import handlingError from "@/app/utils/error";
import userService from "@/app/services/userService";
import FriendButton from "./FriendButton";

const isMyProfile = true;

export default function ProfileMainHeader() {
  //   {
  //   accessToken,
  //   user,
  //   isMyProfile,
  //   friendship,
  //   initialSentFriendRequest,
  // }: {
  //   accessToken: string;
  //   user: FullUser;
  //   isMyProfile: boolean;
  //   friendship: Friendship | null;
  //   initialSentFriendRequest: boolean;
  // }

  const [isLoading, setIsLoading] = useState(false);
  // const [isSentFriendRequest, setIsSentFriendRequest] = useState(
  //   initialSentFriendRequest
  // );
  // const [isFriend, setIsFriend] = useState(friendship?.status === "accepted");
  // const { total: totalFriends } = useFriends((state) => state);

  // const handleSendFriendRequest = async () => {
  //   try {
  //     setIsLoading(true);
  //     await userService.sendFriendRequest(accessToken, user.id);
  //     setIsSentFriendRequest(true);
  //   } catch (error) {
  //     toast.error(handlingError(error));
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // const handleCancelFriendRequest = async () => {
  //   try {
  //     setIsLoading(true);
  //     await userService.cancelFriendRequest(accessToken, user.id);
  //     setIsSentFriendRequest(false);
  //   } catch (error) {
  //     toast.error(handlingError(error));
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // const handleAcceptFriendRequest = async () => {
  //   try {
  //     setIsLoading(true);
  //     await userService.acceptFriendRequest(accessToken, user.id);
  //     setIsFriend(true);
  //   } catch (error) {
  //     toast.error(handlingError(error));
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return (
    <div className="card">
      <div style={{ height: "200px" }}>
        <Link
          href={"/wallpaper.jpg"}
          className="d-block h-100 position-relative"
          data-glightbox
          data-gallery="wallpaper"
        >
          <Image
            src={"/wallpaper.jpg"}
            fill
            alt="Wallpaper"
            className="rounded-top object-fit-cover"
          />
        </Link>
      </div>

      <div className="card-body py-0">
        <div className="d-md-flex align-items-start text-center text-md-start">
          <Avatar
            src={"/01.jpg"}
            wrapperClassName="avatar avatar-xxl mt-n5 mb-3"
            className="rounded-circle border border-3 border-white "
          />

          <div className="ms-md-4 mt-md-3">
            <h1 className="mb-0 h5">
              {"Liu Tiu Diu"} <PatchCheckFill className="text-success small" />
            </h1>
            <p>{10} friends</p>
          </div>

          {/* <div className="d-flex flex-wrap gap-2 mt-3 justify-content-center ms-md-auto">
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
          </div> */}

          <div className="d-flex flex-wrap gap-2 mt-3 justify-content-center ms-md-auto">
            <FriendButton isLoading={isLoading} status="friends" />

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
            {formatDate(Date.now())}
          </li>
        </ul>
      </div>

      <div className="card-footer mt-3 pt-2 pb-0">
        <ProfileMainHeaderMenu />
      </div>
    </div>
  );
}
