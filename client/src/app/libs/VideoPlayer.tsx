"use client";
import "plyr-react/plyr.css";
import Plyr, { PlyrProps, PlyrSource, PlyrOptions } from "plyr-react";
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
        "progress",
        "current-time",
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
