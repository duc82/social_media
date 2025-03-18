"use client";

import useSocketContext from "@/app/hooks/useSocketContext";
import handlingError from "@/app/utils/error";
import {
  faFaceSmile,
  faPaperPlane,
  faPaperclip,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "next/navigation";
import {
  ChangeEvent,
  FormEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import toast from "react-hot-toast";
import messageService from "@/app/services/messageService";
import dynamic from "next/dynamic";
import useEmoji from "@/app/hooks/useEmoji";
import { useSession } from "next-auth/react";
import { Typing } from "@/app/types/socket";

const EmojiPicker = dynamic(() => import("emoji-picker-react"), { ssr: false });

export default function ChatForm({ token }: { token: string }) {
  const [text, setText] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [typing, setTyping] = useState<Typing>({
    conversationId: "",
    fullName: "",
    isTyping: false,
  });
  const { socket } = useSocketContext();
  const { isOpenEmoji, setOpenEmoji, emojiRef } = useEmoji();
  const { data } = useSession();

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { id } = useParams<{ id: string }>();

  const sendMessage = useCallback(async () => {
    const content = text.trim();

    if (!socket || (files.length === 0 && !content)) return;

    try {
      const formData = new FormData();

      formData.append("content", content);
      formData.append("conversation", id);
      for (const file of files) {
        formData.append("files", file);
      }

      const message = await messageService.send(formData, token);

      socket.emit("message", message);
      setText("");
      setFiles([]);
    } catch (error) {
      toast.error(handlingError(error));
    }
  }, [files, id, socket, text, token]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await sendMessage();
  };

  const handleKeyDown = async (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      await sendMessage();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setText(value);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (value && data?.user && socket) {
      socket.emit("typing", {
        isTyping: true,
        conversationId: id,
        fullName: data.user.fullName,
      });

      timeoutRef.current = setTimeout(() => {
        socket.emit("typing", {
          isTyping: false,
          conversationId: id,
          fullName: data.user.fullName,
        });
      }, 1000);
    }
  };

  useEffect(() => {
    if (files.length > 0) {
      sendMessage();
    }
  }, [files, sendMessage]);

  useEffect(() => {
    if (!socket) return;

    const handleTyping = (typing: Typing) => {
      if (typing.conversationId !== id) return;
      setTyping(typing);
    };

    socket.on("typing", handleTyping);

    return () => {
      socket.off("typing", handleTyping);
    };
  }, [socket, id]);

  return (
    <>
      {typing.isTyping && (
        <div
          className="position-absolute start-0"
          style={{ top: -24, padding: "0 1.25rem" }}
        >
          <span className="badge text-bg-primary p-2">
            {typing.fullName} is typing ...
          </span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="d-sm-flex align-items-center">
        <textarea
          className="form-control mb-sm-0 mb-3 resize-none"
          placeholder="Type a message"
          value={text}
          rows={1}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          style={{ height: 41 }}
        ></textarea>

        <div className="position-relative d-inline-block ms-sm-2">
          <button
            type="button"
            className="btn btn-sm btn-danger-soft position-relative"
            onClick={() => setOpenEmoji(!isOpenEmoji)}
          >
            <FontAwesomeIcon className="fs-6" icon={faFaceSmile} />
          </button>
          <div ref={emojiRef} className="position-absolute bottom-100 start-0">
            <EmojiPicker
              open={isOpenEmoji}
              onEmojiClick={(emojiData) =>
                setText((prev) => prev + emojiData.emoji)
              }
            />
          </div>
        </div>

        <label htmlFor="files" className="btn btn-sm btn-secondary-soft ms-2">
          <FontAwesomeIcon className="fs-6" icon={faPaperclip} />
          <input
            type="file"
            id="files"
            className="d-none"
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
    </>
  );
}
