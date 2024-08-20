"use client";

import { sendMessage } from "@/app/actions/messageAction";
import useSocketContext from "@/app/hooks/useSocketContext";
import { uploadFile } from "@/app/libs/firebase";
import { CreateMessageDto } from "@/app/types/message";
import handlingError from "@/app/utils/error";
import {
  faFaceSmile,
  faPaperPlane,
  faPaperclip,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "next/navigation";
import {
  FormEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";

export default function ChatForm() {
  const [text, setText] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const { socket } = useSocketContext();

  const { id } = useParams<{ id: string }>();

  const handleSendMessage = useCallback(async () => {
    const content = text.trim();

    if (!socket || (files.length === 0 && !content)) return;

    try {
      const data: CreateMessageDto = {
        content,
        conversation: id,
        files: [],
      };

      for (const file of files) {
        const url = await uploadFile(`messages/${file.name}`, file);
        data.files?.push({
          url,
          type: file.type.includes("image") ? "image" : "video",
        });
      }

      const message = await sendMessage(data);

      socket.emit("message", message);
      setText("");
      setFiles([]);
    } catch (error) {
      toast.error(handlingError(error));
    }
  }, [files, id, socket, text]);

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

  useEffect(() => {
    if (files.length > 0) {
      handleSendMessage();
    }
  }, [files, handleSendMessage]);

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
      <label htmlFor="file" className="btn btn-sm btn-secondary-soft ms-2">
        <FontAwesomeIcon className="fs-6" icon={faPaperclip} />
        <input
          type="file"
          className="d-none"
          id="file"
          multiple
          accept="image/*, video/*"
          onChange={(e) => {
            if (e.target.files) {
              setFiles([...e.target.files]);
            }
          }}
        />
      </label>
      <button type="submit" className="btn btn-sm btn-primary ms-2">
        <FontAwesomeIcon className="fs-6" icon={faPaperPlane} />
      </button>
    </form>
  );
}
