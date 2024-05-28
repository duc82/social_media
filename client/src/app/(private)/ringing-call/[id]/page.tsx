"use client";

import IncomingCallPanel from "@/app/components/RingingCall/IncomingCallPanel";
import OutgoingCallPanel from "@/app/components/RingingCall/OutgoingCallPanel";
import {
  Call,
  StreamCall,
  useStreamVideoClient,
} from "@stream-io/video-react-sdk";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type Params = {
  id: string;
};

export default function RingingCallPage() {
  const client = useStreamVideoClient();
  const [call, setCall] = useState<Call>();
  const { id } = useParams<Params>();

  useEffect(() => {
    if (!id || !client) return;

    const myCall = client.call("default", id);

    myCall.join();

    setCall(myCall);

    return () => {
      setCall(undefined);
      myCall.endCall();
    };
  }, [id, client]);

  if (!call) return null;

  return (
    <StreamCall call={call}>
      {call.isCreatedByMe ? <OutgoingCallPanel /> : <IncomingCallPanel />}
    </StreamCall>
  );
}
