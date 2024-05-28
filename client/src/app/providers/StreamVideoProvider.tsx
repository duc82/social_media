"use client";
import {
  StreamTheme,
  StreamVideo,
  StreamVideoClient,
} from "@stream-io/video-react-sdk";
import { useSession } from "next-auth/react";
import { PropsWithChildren, useEffect, useState } from "react";
import { getStreamToken } from "../actions/streamAction";
import { useTheme } from "next-themes";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY!;

export default function StreamVideoProvider({ children }: PropsWithChildren) {
  const [client, setClient] = useState<StreamVideoClient>();
  const { data } = useSession();
  const user = data?.user;
  const theme = useTheme();

  useEffect(() => {
    if (!user) return;

    const myClient = new StreamVideoClient({
      apiKey,
      user: {
        id: user.id,
        name: user.fullName,
        image: user.profile.avatar,
      },
      tokenProvider: () => getStreamToken(user.id),
    });

    setClient(myClient);
    return () => {
      myClient.disconnectUser();
      setClient(undefined);
    };
  }, [user]);

  if (!client) return;

  return (
    <StreamVideo client={client}>
      <StreamTheme className={theme.resolvedTheme}>{children}</StreamTheme>
    </StreamVideo>
  );
}
