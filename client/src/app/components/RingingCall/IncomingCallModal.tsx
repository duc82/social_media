"use client";

import useBootstrapContext from "@/app/hooks/useBootstrapContext";
import useSocketContext from "@/app/hooks/useSocketContext";
import formatName from "@/app/utils/formatName";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import Avatar from "../Avatar";
import { CallUser } from "@/app/types/socket";
import { FullUser } from "@/app/types/user";
import userService from "@/app/services/userService";
import ringtone from "@/app/assets/sounds/ringtone.mp3";

export default function IncomingCallModal() {
  const { socket } = useSocketContext();
  const incomingCallModalRef = useRef<HTMLDivElement>(null);
  const [callUser, setCallUser] = useState<CallUser | null>(null);
  const [user, setUser] = useState<FullUser | null>(null);
  const bootstrap = useBootstrapContext();
  const { data } = useSession();
  const token = data?.token;
  const currentUser = data?.user;
  const [audio] = useState(new Audio(ringtone));

  const handleAcceptCall = () => {
    if (!callUser) return;

    const width = 1280;
    const height = 720;

    const left = screen.width / 2 - width / 2;
    const top = screen.height / 2 - height / 2;

    window.open(
      `/ringing-call?hasVideo=${callUser.hasVideo}&calleeId=${callUser.calleeId}&callerId=${callUser.callerId}`,
      "_blank",
      `location=yes,scrollbars=yes,status=yes,width=${width},height=${height},top=${top},left=${left}`
    );
  };

  const handleRejectCall = () => {
    if (bootstrap && incomingCallModalRef.current) {
      const modal = new bootstrap.Modal(incomingCallModalRef.current);
      modal.hide();
    }
  };

  useEffect(() => {
    if (!socket) return;

    const handleCallUser = (data: CallUser) => {
      setCallUser(data);
      if (bootstrap && incomingCallModalRef.current) {
        const modal = new bootstrap.Modal(incomingCallModalRef.current);
        modal.show();
      }
    };

    socket.on("callUser", handleCallUser);

    return () => {
      socket.off("callUser", handleCallUser);
    };
  }, [socket, bootstrap, currentUser]);

  useEffect(() => {
    if (!callUser || !token) return;
    userService.getById(callUser.callerId, token).then((data) => {
      setUser(data);
    });
  }, [callUser, token]);

  useEffect(() => {
    if (callUser) {
      audio.play();
    }

    return () => {
      audio.pause();
    };
  }, [callUser, audio]);

  const fullName = formatName(user?.firstName || "", user?.lastName || "");

  return (
    <div
      className="modal fade"
      id="incomingCallModal"
      ref={incomingCallModalRef}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Incoming Call</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={handleRejectCall}
            ></button>
          </div>
          <div className="modal-body">
            <div className="d-flex justify-content-center align-items-center">
              <Avatar
                src={user?.profile.avatar || ""}
                alt={user?.username || "avatar"}
              />
              <div className="ms-3">
                <h5 className="mb-0">{fullName}</h5>
                <p className="mb-0">Incoming call...</p>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-danger"
              data-bs-dismiss="modal"
              onClick={handleRejectCall}
            >
              Decline
            </button>
            <button
              type="button"
              className="btn btn-success"
              data-bs-dismiss="modal"
              onClick={handleAcceptCall}
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
