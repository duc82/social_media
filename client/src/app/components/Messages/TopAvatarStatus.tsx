"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Avatar from "../Avatar";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import {
  Archive,
  CameraVideoFill,
  CheckLg,
  MicMute,
  PersonCheck,
  TelephoneFill,
  ThreeDotsVertical,
  Trash,
} from "react-bootstrap-icons";
import { FullUser } from "@/app/types/user";
import clsx from "clsx";
import useSocket from "@/app/hooks/useSocket";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useSession } from "next-auth/react";

interface TopAvatarStatusProps {
  user?: FullUser;
}

export default function TopAvatarStatus({ user }: TopAvatarStatusProps) {
  const { onlines } = useSocket();
  const client = useStreamVideoClient();
  const { data } = useSession();
  const currentUser = data?.user;

  const isOnline = onlines.some((online) => online.userId === user?.id);

  const openRingingCall = (hasVideo: boolean) => {
    if (!client || !user || !currentUser) return;
    const callId = "call-test";

    const call = client.call("default", callId);

    call.getOrCreate({
      ring: true,
      data: {
        members: [
          {
            user_id: currentUser.id,
          },
          {
            user_id: user.id,
          },
        ],
      },
      members_limit: 2,
    });

    window.open(
      `/ringing-call/${callId}?hasVideo=${hasVideo}`,
      "_blank",
      "location=yes,scrollbars=yes,status=yes"
    );
  };

  return (
    <div className="d-sm-flex justify-content-between align-items-center">
      <div className="d-flex align-items-center mb-2 mb-sm-0">
        <Avatar
          wrapperClassName="flex-shrink-0 me-2"
          className="rounded-circle"
          src={user?.profile.avatar ?? ""}
          alt={user?.fullName}
        />
        <div>
          <h6 className="mb-0 mt-1">{user?.fullName}</h6>

          <div className="small">
            <FontAwesomeIcon
              icon={faCircle}
              className={clsx(
                "me-1",
                isOnline ? "text-success" : "text-danger"
              )}
            />
            {isOnline ? "Online" : "Offline"}
          </div>
        </div>
      </div>
      <div className="d-flex align-items-center">
        <button
          type="button"
          onClick={() => openRingingCall(false)}
          className="icon-md rounded-circle btn btn-primary-soft me-2 px-2"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          data-bs-title="Audio call"
        >
          <TelephoneFill />
        </button>
        <button
          type="button"
          className="icon-md rounded-circle btn btn-primary-soft me-2 px-2"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          data-bs-title="Video call"
          onClick={() => openRingingCall(true)}
        >
          <CameraVideoFill />
        </button>
        <div className="dropdown">
          <button
            type="button"
            className="icon-md rounded-circle btn btn-primary-soft me-2 px-2"
            data-bs-toggle="dropdown"
            data-bs-auto-close="outside"
          >
            <ThreeDotsVertical />
          </button>
          <ul className="dropdown-menu dropdown-menu-end">
            <li>
              <Link className="dropdown-item" href="#">
                <CheckLg className="me-2 fw-icon" />
                Mark as read
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" href="#">
                <MicMute className="me-2 fw-icon" />
                Mute conversation
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" href="#">
                <PersonCheck className="me-2 fw-icon" />
                View profile
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" href="#">
                <Trash className="me-2 fw-icon" />
                Delete chat
              </Link>
            </li>
            <li className="dropdown-divider"></li>
            <li>
              <Link className="dropdown-item" href="#">
                <Archive className="me-2 fw-icon" />
                Archive chat
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
