"use client";

import Avatar from "@/app/components/Avatar";
import useSocketContext from "@/app/hooks/useSocketContext";
import formatName from "@/app/utils/formatName";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Peer from "peerjs";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  CameraVideoFill,
  CameraVideoOffFill,
  MicFill,
  MicMuteFill,
} from "react-bootstrap-icons";

export default function RingingCall() {
  const { socket } = useSocketContext();
  const { data } = useSession();
  const currentUser = data?.user;

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

  const handleEnd = useCallback(() => {
    if (!socket) return;
    socket.emit("endCall");
    window.close();
  }, [socket]);

  useEffect(() => {
    if (!socket || !currentUser || !calleeId) return;

    const peer = new Peer(currentUser.id);

    socket.on("endCall", handleEnd);

    const room = `${callerId ? callerId : currentUser.id}-${calleeId}`;

    peer.on("open", (_id) => {
      setPeer(peer);
      socket.emit("joinCall", room);
    });

    navigator.mediaDevices
      .getUserMedia({ video: hasVideo, audio: true })
      .then((stream) => {
        if (!localStream) {
          setLocalStream(stream);
        }
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
      });

    peer.on("call", (call) => {
      if (!localStream) return;
      call.answer(localStream);
      call.on("stream", (remoteStream) => {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = remoteStream;
        }
      });
    });

    return () => {
      peer.disconnect();
      socket.off("endCall", handleEnd);
    };
  }, [
    socket,
    currentUser,
    calleeId,
    callerId,
    hasVideo,
    localStream,
    handleEnd,
  ]);

  useEffect(() => {
    if (!socket || !callerId || !localStream || !peer) return;

    socket.on("endCall", handleEnd);

    const call = peer.call(callerId, localStream);

    call.on("stream", (remoteStream) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = remoteStream;
      }
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
    if (!localStream || !localVideoRef.current) return;
    setIsMicMuted((prevState) => !prevState);
    localStream.getAudioTracks().forEach((track) => {
      track.enabled = !track.enabled;
    });
  };

  const toggleCam = () => {
    if (!localStream || !localVideoRef.current) return;
    setIsCamOn((prevState) => !prevState);
    localStream.getVideoTracks().forEach((track) => {
      track.enabled = !track.enabled;
    });
  };

  const fullName = formatName(
    currentUser?.firstName || "",
    currentUser?.lastName || ""
  );

  return (
    <div className="position-relative overflow-hidden vh-100">
      <video
        ref={remoteVideoRef}
        autoPlay
        playsInline
        className="object-fit-cover w-100 h-100"
      />
      <div
        className="position-absolute z-1 d-flex flex-column align-items-center justify-content-center"
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
        />
        {!isCamOn && (
          <>
            <Avatar
              src={currentUser?.profile.avatar || ""}
              alt={currentUser?.username}
              wrapperClassName="mb-2"
              className="rounded-circle"
              width={60}
              height={60}
            />
            <h5>{fullName}</h5>
          </>
        )}
      </div>
      <div
        className="position-absolute translate-middle-x start-50 d-flex align-items-center gap-2"
        style={{
          bottom: 20,
        }}
      >
        <button type="button" className="btn btn-dark" onClick={toggleCam}>
          {isCamOn ? <CameraVideoFill /> : <CameraVideoOffFill />}
        </button>
        <button type="button" className="btn btn-dark" onClick={toggleMic}>
          {isMicMuted ? <MicMuteFill /> : <MicFill />}
        </button>
        <button type="button" onClick={handleEnd} className="btn btn-danger">
          Leave
        </button>
      </div>
    </div>
  );
}
