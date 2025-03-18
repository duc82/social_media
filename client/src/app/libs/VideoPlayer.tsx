"use client";
import "plyr-react/plyr.css";
import { PlyrProps, PlyrSource, PlyrOptions } from "plyr-react";
import { useMemo } from "react";
import dynamic from "next/dynamic";

const Plyr = dynamic(async () => await import("plyr-react"), { ssr: false });

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
          provider: "html5",
        },
      ],
    }),
    [src]
  );

  const options: PlyrOptions = useMemo(
    () => ({
      controls: [
        "play-large",
        "play",
        "current-time",
        "duration",
        "progress",
        "mute",
        "volume",
        "captions",
        "settings",
        "pip",
        "airplay",
        "fullscreen",
      ],
    }),
    []
  );

  return <Plyr {...props} source={source} options={options} />;
}
