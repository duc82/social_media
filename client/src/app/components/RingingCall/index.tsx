"use client";

import Avatar from "@/app/components/Avatar";
import useSocketContext from "@/app/hooks/useSocketContext";
import userService from "@/app/services/userService";
import { FullUser } from "@/app/types/user";
import formatName from "@/app/utils/formatName";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Peer from "peerjs";
import { useCallback, useEffect, useRef, useState } from "react";
import RingingCallSpinner from "./RingingCallSpinner";

export default function RingingCall() {
  const { socket } = useSocketContext();
  const { data } = useSession();

  const searchParams = useSearchParams();
  const calleeId = searchParams.get("calleeId");
  const callerId = searchParams.get("callerId");
  const hasVideo = searchParams.get("hasVideo") === "true";

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  const [peer, setPeer] = useState<Peer | null>(null);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isCamOn, setIsCamOn] = useState(hasVideo);
  const [user, setUser] = useState<FullUser | null>(null);
  const [isRemoteCamOn, setIsRemoteCamOn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleEnd = useCallback(() => {
    if (!socket) return;
    socket.emit("endCall");
    window.close();
  }, [socket]);

  useEffect(() => {
    if (!socket || !data || !calleeId) return;
    const currentUser = data.user;

    const peer = new Peer(currentUser.id);

    socket.on("endCall", handleEnd);

    const room = `${callerId ? callerId : currentUser.id}-${calleeId}`;

    peer.on("open", (_id) => {
      setPeer(peer);
      socket.emit("joinCall", room);
    });

    const userId = callerId || calleeId;

    userService.getById(userId, data.token).then((user) => {
      setUser(user);
      setIsLoading(false);
    });

    navigator.mediaDevices
      .getUserMedia({ video: hasVideo, audio: true })
      .then((stream) => {
        if (!localStream) {
          setLocalStream(stream);
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = stream;
          }
        }
      });

    peer.on("call", (call) => {
      if (!localStream) return;
      call.answer(localStream);
      call.on("stream", (remoteStream) => {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = remoteStream;
        }
        const videoTracks = remoteStream.getVideoTracks();
        setIsRemoteCamOn(videoTracks.length > 0);
      });
    });

    return () => {
      peer.disconnect();
      socket.off("endCall", handleEnd);
    };
  }, [socket, data, calleeId, callerId, hasVideo, localStream, handleEnd]);

  useEffect(() => {
    if (!socket || !callerId || !localStream || !peer) return;

    socket.on("endCall", handleEnd);

    const call = peer.call(callerId, localStream);

    call.on("stream", (remoteStream) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = remoteStream;
      }
      const videoTracks = remoteStream.getVideoTracks();
      setIsRemoteCamOn(videoTracks.length > 0);
    });

    return () => {
      socket.off("endCall", handleEnd);
      peer.disconnect();
    };
  }, [socket, peer, callerId, localStream, handleEnd]);

  useEffect(() => {
    // detect if the tab is closed
    window.addEventListener("beforeunload", handleEnd);

    return () => {
      window.removeEventListener("beforeunload", handleEnd);
    };
  }, [handleEnd]);

  const toggleMic = () => {
    if (!localStream) return;

    setIsMicMuted((prevState) => !prevState);
    localStream.getAudioTracks().forEach((track) => {
      track.enabled = !track.enabled;
    });
  };

  const toggleCam = () => {
    if (!localStream) return;

    navigator.mediaDevices
      .getUserMedia({ video: !isCamOn, audio: true })
      .then((stream) => {
        localStream.getVideoTracks().forEach((track) => {
          track.stop();
          localStream.removeTrack(track);
        });

        stream.getVideoTracks().forEach((track) => {
          localStream.addTrack(track);
        });

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = localStream;
        }
      });
    localStream.getVideoTracks().forEach((track) => {
      track.enabled = !track.enabled;
    });
    setLocalStream(localStream);
    setIsCamOn(!isCamOn);
  };

  const currentUserFullName = formatName(
    data?.user?.firstName || "",
    data?.user?.lastName || ""
  );

  const userFullName = formatName(user?.firstName || "", user?.lastName || "");

  if (isLoading || !user) {
    return <RingingCallSpinner />;
  }

  return (
    <div className="position-relative overflow-hidden vh-100">
      <video
        ref={remoteVideoRef}
        autoPlay
        className={clsx(
          "object-fit-cover w-100 h-100",
          isRemoteCamOn ? "d-block" : "d-none"
        )}
      />
      {!isRemoteCamOn && (
        <div className="d-flex flex-column align-items-center justify-content-center bg-black h-100">
          <div className="avatar mb-2" style={{ width: 60, height: 60 }}>
            <Avatar
              src={user.profile.avatar}
              alt={user.username}
              className="rounded-circle"
            />
          </div>
          <h5 className="text-white">{userFullName}</h5>
        </div>
      )}

      <div
        className="position-absolute z-1 d-flex"
        style={{ bottom: 20, right: 20, width: 350, height: 200 }}
      >
        <video
          ref={localVideoRef}
          autoPlay
          muted
          className={clsx(
            "object-fit-cover rounded-3 w-100 h-100",
            isCamOn ? "d-block" : "d-none"
          )}
          style={{ transform: "rotateY(180deg)" }}
        />
        {!isCamOn && (
          <div className="w-100 d-flex flex-column align-items-center justify-content-center bg-black rounded-3">
            <div className="avatar mb-2" style={{ width: 60, height: 60 }}>
              <Avatar
                src={data?.user?.profile.avatar || ""}
                alt={data?.user?.username}
                className="rounded-circle"
              />
            </div>
            <h5 className="text-white">{currentUserFullName}</h5>
          </div>
        )}
      </div>
      <div
        className="position-absolute translate-middle-x start-50 d-flex align-items-center gap-2"
        style={{
          bottom: 20,
        }}
      >
        <button type="button" className="btn btn-dark" onClick={toggleCam}>
          {isCamOn ? (
            <i className="bi bi-camera-video-fill"></i>
          ) : (
            <i className="bi bi-camera-video-off-fill"></i>
          )}
        </button>
        <button type="button" className="btn btn-dark" onClick={toggleMic}>
          {isMicMuted ? (
            <i className="bi bi-mic-mute-fill"></i>
          ) : (
            <i className="bi bi-mic-fill"></i>
          )}
        </button>
        <button type="button" onClick={handleEnd} className="btn btn-danger">
          Leave
        </button>
      </div>
    </div>
  );
}
