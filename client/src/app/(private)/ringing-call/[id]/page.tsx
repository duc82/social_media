"use client";

import IncomingCallPanel from "@/app/components/RingingCall/IncomingCallPanel";
import OutgoingCallPanel from "@/app/components/RingingCall/OutgoingCallPanel";
import {
  Call,
  StreamCall,
  useStreamVideoClient,
} from "@stream-io/video-react-sdk";
import { useSession } from "next-auth/react";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type Params = {
  id: string;
};

export default function RingingCallPage() {
  const client = useStreamVideoClient();
  const [call, setCall] = useState<Call>();
  const { id } = useParams<Params>();
  const searchParams = useSearchParams();
  const hasVideo = searchParams.get("hasVideo");
  const userId = searchParams.get("userId");
  const { data } = useSession();
  const currentUser = data?.user;

  useEffect(() => {
    if (!id || !client || !userId || !currentUser) return;

    const myCall = client.call("default", id);

    myCall.getOrCreate({
      ring: true,
      data: {
        members: [
          {
            user_id: currentUser.id,
          },
          {
            user_id: userId,
          },
        ],
      },
      members_limit: 2,
    });

    myCall.join();

    setCall(myCall);

    return () => {
      setCall(undefined);
      myCall.leave();
    };
  }, [id, client, userId, hasVideo, currentUser]);

  if (!call) return null;

  return (
    <StreamCall call={call}>
      {call.isCreatedByMe ? <OutgoingCallPanel /> : <IncomingCallPanel />}
    </StreamCall>
  );
}
