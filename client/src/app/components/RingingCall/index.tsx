"use client";

import Peer from "peerjs";
import clsx from "clsx";
import Avatar from "@/app/components/Avatar";
import useSocketContext from "@/app/hooks/useSocketContext";
import { FullUser } from "@/app/types/user";

import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

export default function RingingCall({
  user,
  currentUser,
}: {
  user: FullUser;
  currentUser: FullUser;
}) {
  const { socket } = useSocketContext();

  const searchParams = useSearchParams();
  const conversationId = searchParams.get("conversationId") || "";
  const calleeId = searchParams.get("calleeId");
  const callerId = searchParams.get("callerId");
  const hasVideo = searchParams.get("hasVideo") === "true";

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const outGoingRef = useRef<HTMLAudioElement>(null);

  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isCamOn, setIsCamOn] = useState(hasVideo);
  const [isRemoteCamOn, setIsRemoteCamOn] = useState(false);
  const [peer, setPeer] = useState<Peer | null>(null);
  const [startDate, setStartDate] = useState<Date>(new Date());

  const handleEnd = useCallback(async () => {
    window.close();
    if (window.closed) return;

    const room = `${callerId ? callerId : currentUser.id}_${
      calleeId ? calleeId : currentUser.id
    }`;

    const data: any = {
      conversation: conversationId,
      callType: hasVideo ? "video" : "audio",
      callStatus: "failed",
      callerId: callerId ? callerId : currentUser.id,
      calleeId: calleeId ? calleeId : currentUser.id,
      isCallee: !!callerId,
      room,
    };

    socket?.emit("endCall", data);
  }, [callerId, calleeId, currentUser, socket, conversationId, hasVideo]);

  const playOutgoing = async () => {
    const outgoing = outGoingRef.current;
    if (outgoing && outgoing.paused) {
      await outgoing.play();
      outgoing.muted = false;
    }
  };

  const stopOutgoing = () => {
    const outgoing = outGoingRef.current;
    if (outgoing) {
      outgoing.pause();
      outgoing.remove();
    }
  };

  // Get local stream
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: hasVideo, audio: true })
      .then((stream) => {
        setLocalStream(stream);
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
      });
  }, [hasVideo]);

  // Caller
  useEffect(() => {
    if (callerId) return;

    if (!socket || !currentUser || !calleeId) return;

    const peer = new Peer(currentUser.id);

    socket.on("endCall", handleEnd);
    socket.on("callRejected", handleEnd);

    const room = `${currentUser.id}_${calleeId}`;

    peer.on("open", (_id) => {
      socket.emit("joinCall", room);
    });

    peer.on("call", (call) => {
      if (localStream) {
        call.answer(localStream);
      }
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
      socket.off("callRejected", handleEnd);
    };
  }, [socket, callerId, calleeId, localStream, currentUser, handleEnd]);

  // Callee
  useEffect(() => {
    if (!callerId) return;

    if (!socket || !currentUser) return;

    const peer = new Peer(currentUser.id);

    socket.on("endCall", handleEnd);
    socket.on("callRejected", handleEnd);

    const room = `${callerId}_${currentUser.id}`;

    peer.on("open", (_id) => {
      setPeer(peer);
      socket.emit("joinCall", room);
    });

    return () => {
      peer.disconnect();
      socket.off("endCall", handleEnd);
      socket.off("callRejected", handleEnd);
    };
  }, [socket, currentUser, callerId, handleEnd]);

  // Callee call
  useEffect(() => {
    if (!(callerId && peer)) return;

    if (localStream) {
      const call = peer.call(callerId, localStream);

      call.on("stream", (remoteStream) => {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = remoteStream;
        }
        const videoTracks = remoteStream.getVideoTracks();
        setIsRemoteCamOn(videoTracks.length > 0);
      });
    }
  }, [localStream, callerId, peer]);

  useEffect(() => {
    // detect if the pop up is closed
    window.addEventListener("beforeunload", handleEnd);

    return () => {
      window.removeEventListener("beforeunload", handleEnd);
    };
  }, [handleEnd]);

  const toggleMic = () => {
    if (!localStream) return;

    setIsMicMuted((prev) => !prev);
    localStream.getAudioTracks().forEach((track) => {
      track.enabled = !track.enabled;
    });
    setLocalStream(localStream);
  };

  const toggleCam = () => {
    if (!localStream) return;

    setIsCamOn((prev) => !prev);
    localStream.getVideoTracks().forEach((track) => {
      track.enabled = !track.enabled;
    });
    setLocalStream(localStream);
  };

  return (
    <div
      className="position-relative overflow-hidden vh-100"
      style={{ backgroundColor: "rgb(20,20,20)" }}
    >
      <div
        className="video-container"
        style={{
          display: isRemoteCamOn ? "block" : "none",
        }}
      >
        <video ref={remoteVideoRef} autoPlay />
      </div>

      {!callerId && (
        <audio src="/outgoing.mp3" ref={outGoingRef} muted loop></audio>
      )}

      {!isRemoteCamOn && (
        <div className="d-flex flex-column align-items-center justify-content-center h-100">
          <div className="avatar mb-2" style={{ width: 60, height: 60 }}>
            <Avatar
              src={user.profile.avatar}
              alt={user.username}
              className="rounded-circle"
            />
          </div>
          <h5 className="text-white">{user.fullName}</h5>
          <p className="text-light">Calling...</p>
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
          <div
            className="w-100 d-flex flex-column align-items-center justify-content-center rounded-3"
            style={{ backgroundColor: "rgb(10,10,10)" }}
          >
            <div className="avatar mb-2" style={{ width: 60, height: 60 }}>
              <Avatar
                src={currentUser.profile.avatar}
                alt={currentUser.username}
                className="rounded-circle"
              />
            </div>
            <h5 className="text-white">{currentUser.fullName}</h5>
          </div>
        )}
      </div>
      <div
        className="position-absolute translate-middle-x start-50 d-flex align-items-center gap-2 z-3"
        style={{
          bottom: 20,
        }}
      >
        <button
          type="button"
          className={clsx("btn", isCamOn ? " btn-dark" : "btn-light")}
          onClick={toggleCam}
        >
          <i
            className={clsx(
              "bi",
              isCamOn ? "bi-camera-video-fill" : "bi-camera-video-off-fill"
            )}
          ></i>
        </button>
        <button
          type="button"
          className={clsx("btn", isMicMuted ? "btn-light" : "btn-dark")}
          onClick={toggleMic}
        >
          <i
            className={clsx(
              "bi",
              isMicMuted ? "bi-mic-mute-fill" : "bi-mic-fill"
            )}
          ></i>
        </button>
        <button type="button" onClick={handleEnd} className="btn btn-danger">
          Leave
        </button>
      </div>
    </div>
  );
}
