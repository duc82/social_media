"use client";

import useSocket from "@/app/hooks/useSocket";
import messageService from "@/app/services/messageService";
import {
  faFaceSmile,
  faPaperPlane,
  faPaperclip,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

export default function SendForm() {
  const [text, setText] = useState("");
  const { socket } = useSocket();

  const { data } = useSession();
  const accessToken = data?.accessToken;

  const { id } = useParams();

  const handleChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleSendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const content = text.trim();

    if (!content || !accessToken || !socket) return;

    try {
      const message = await messageService.send(
        {
          content,
          conversation: id as string,
        },
        accessToken
      );

      socket.emit("message", message);
      setText("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSendMessage} className="d-sm-flex align-items-end">
      <input
        className="form-control mb-sm-0 mb-3"
        placeholder="Type a message"
        value={text}
        onChange={handleChangeText}
        style={{ height: 41 }}
      />
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
