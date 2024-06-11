"use client";

import {
  CancelCallButton,
  SpeakingWhileMutedNotification,
  ToggleAudioPublishingButton,
  ToggleVideoPublishingButton,
  ReactionsButton,
  useCallStateHooks,
  CallingState,
} from "@stream-io/video-react-sdk";

interface RingingCallControlsProps {
  onLeave?: () => void;
}

export default function RingingCallControls({
  onLeave,
}: RingingCallControlsProps) {
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  const buttonsDisabled = callingState === CallingState.JOINING;

  return (
    <div className="str-video__call-controls">
      <SpeakingWhileMutedNotification>
        <ToggleAudioPublishingButton />
      </SpeakingWhileMutedNotification>
      <ToggleVideoPublishingButton />
      <ReactionsButton />
      <CancelCallButton onLeave={onLeave} disabled={buttonsDisabled} />
    </div>
  );
}
