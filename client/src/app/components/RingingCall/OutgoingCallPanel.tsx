"use client";

import RingingCallControls from "./RingingCallControls";
import VideoLayout from "./VideoLayout";

export default function OutgoingCallPanel() {
  return (
    <div>
      <VideoLayout />
      <RingingCallControls
        onLeave={() => {
          window.close();
        }}
      />
    </div>
  );
}