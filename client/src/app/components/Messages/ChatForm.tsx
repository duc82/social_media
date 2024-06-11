"use client";

import { sendMessage } from "@/app/actions/messageAction";
import useSocket from "@/app/hooks/useSocket";
import {
  faFaceSmile,
  faPaperPlane,
  faPaperclip,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "next/navigation";
import { FormEvent, KeyboardEvent, useState } from "react";
import toast from "react-hot-toast";

export default function ChatForm() {
  const [text, setText] = useState("");
  const { socket } = useSocket();

  const { id } = useParams();

  const handleSendMessage = async () => {
    const content = text.trim();

    if (!content || !socket) return;

    try {
      const message = await sendMessage({
        content,
        conversation: id as string,
      });

      socket.emit("message", message);
      setText("");
    } catch (error) {
      toast.error("Send message failed. Try again!");
    }
  };

  const handleSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleSendMessage();
  };

  const handleKeyDown = async (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      await handleSendMessage();
    }
  };

  return (
    <form onSubmit={handleSubmitForm} className="d-sm-flex align-items-center">
      <textarea
        className="form-control mb-sm-0 mb-3 resize-none"
        placeholder="Type a message"
        value={text}
        rows={1}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        style={{ height: 41 }}
      ></textarea>
      <button type="button" className="btn btn-sm btn-danger-soft ms-sm-2">
        <FontAwesomeIcon className="fs-6" icon={faFaceSmile} />
      </button>
      <button type="button" className="btn btn-sm btn-secondary-soft ms-2">
        <FontAwesomeIcon className="fs-6" icon={faPaperclip} />
      </button>
      <button type="submit" className="btn btn-sm btn-primary ms-2">
        <FontAwesomeIcon className="fs-6" icon={faPaperPlane} />
      </button>
    </form>
  );
}
