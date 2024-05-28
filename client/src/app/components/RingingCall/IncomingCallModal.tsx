"use client";
import { CallingState, useCalls } from "@stream-io/video-react-sdk";
import { useEffect } from "react";

export default function IncomingCallModal() {
  const calls = useCalls();

  const incomingCall = calls.find(
    (call) =>
      call.state.callingState === CallingState.RINGING &&
      call.isCreatedByMe === false
  );

  useEffect(() => {
    console.log(calls);
  }, [calls]);

  if (!incomingCall) return null;

  return (
    <div
      className="modal fade show"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">A ringing call</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <p>Modal body text goes here.</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                window.open(
                  `/ringing-call/${incomingCall.id}?hasVideo=true`,
                  "_blank",
                  "location=yes,scrollbars=yes,status=yes"
                );
              }}
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
