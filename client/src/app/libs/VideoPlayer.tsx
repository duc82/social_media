"use client";
import "plyr-react/plyr.css";
import Plyr, { PlyrProps, PlyrSource } from "plyr-react";
import { useMemo } from "react";

interface VideoPlayerProps extends Omit<PlyrProps, "source"> {
  src: string;
}

export default function VideoPlayer({ src, ...props }: VideoPlayerProps) {
  const source: PlyrSource = useMemo(
    () => ({
      type: "video",
      sources: [
        {
          src,
        },
      ],
    }),
    [src]
  );

  return <Plyr {...props} source={source} />;
}
