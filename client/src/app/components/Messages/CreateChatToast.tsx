"use client";

import userService from "@/app/services/userService";
import { FullUser } from "@/app/types/user";
import debounce from "@/app/utils/debounce";

import {
  faFaceSmile,
  faPaperclip,
  faPaperPlane,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Avatar from "../Avatar";
import useSocketContext from "@/app/hooks/useSocketContext";
import conversationService from "@/app/services/conversationService";
import { useRouter } from "next/navigation";
import EmojiPicker from "emoji-picker-react";
import useEmoji from "@/app/hooks/useEmoji";

export default function CreateChatToast({ token }: { token: string }) {
  const [search, setSerach] = useState("");
  const [users, setUsers] = useState<FullUser[]>([]);
  const [to, setTo] = useState<FullUser[]>([]);
  const [text, setText] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const { isOpenEmoji, emojiRef, setOpenEmoji } = useEmoji();
  const { socket } = useSocketContext();

  const router = useRouter();

  const debounceSearch = debounce(
    async (value: string, exclude: string, token: string) => {
      if (!value) return setUsers([]);

      try {
        const data = await userService.getAll(token, {
          search: value,
          page: 1,
          limit: 10,
          exclude,
        });
        setUsers(data.users);
      } catch (error) {
        console.error(error);
      }
    },
    500
  );

  const getSearchResults = useCallback(debounceSearch, []);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSerach(value);
    getSearchResults(value, JSON.stringify(to.map((u) => u.id)), token);
  };

  const sendMessage = async () => {
    const content = text.trim();

    if (!socket || (files.length === 0 && !content) || to.length === 0) return;

    try {
      const formData = new FormData();

      formData.append("content", content);
      for (const file of files) {
        formData.append("files", file);
      }
      for (const member of to) {
        formData.append("members", member.id);
      }

      const { conversation, message } =
        await conversationService.createWithMessage(formData, token);

      socket.emit("message", message);
      setText("");
      setFiles([]);

      router.push(`/messages/${conversation.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage();
  };

  useEffect(() => {
    if (files.length > 0) {
      sendMessage();
    }
  }, [files, sendMessage]);

  return (
    <div className="position-fixed bottom-0 end-0 p-3 z-1">
      <div
        id="createChatToast"
        className="toast bg-mode fade"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        data-bs-autohide="false"
      >
        <div className="toast-header bg-mode d-flex justify-content-between">
          <h6 className="mb-0">New message</h6>
          <button
            className="btn btn-secondary-soft-hover py-1 px-2"
            data-bs-dismiss="toast"
            aria-label="Close"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        <div className="toast-body collapse show" id="collapseChat">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <div className="input-group">
                <span className="input-group-text border-0">To</span>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Type a name or multiple names"
                  value={search}
                  onChange={handleSearch}
                />

                <div
                  className="position-absolute top-100 left-0 shadow-md border p-2"
                  style={{
                    width: 200,
                    display: users.length > 0 ? "block" : "none",
                  }}
                >
                  {users.map((user) => (
                    <div
                      key={user.id}
                      className="d-flex align-items-center px-2 py-1 cursor-pointer"
                      onClick={() => {
                        setTo((prev) => [...prev, user]);
                        setSerach("");
                        setUsers([]);
                      }}
                    >
                      <div className="avatar avatar-xs">
                        <Avatar
                          src={user.profile.avatar}
                          className="rounded-circle"
                        />
                      </div>
                      <div className="ms-2">
                        {(user.firstName, user.lastName)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {to.length > 0 && (
                <div className="d-flex align-items-center mt-2">
                  {to.map((user) => (
                    <div
                      key={user.id}
                      className="badge text-bg-light fw-normal mr-1"
                    >
                      {(user.firstName, user.lastName)}
                      <button
                        type="button"
                        className="btn p-0 ms-1"
                        onClick={() => {
                          setTo((prev) => prev.filter((p) => p.id !== user.id));
                        }}
                      >
                        <FontAwesomeIcon icon={faXmark} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div style={{ height: 200 }}></div>
            <div className="d-sm-flex align-items-end">
              <textarea
                className="form-control mb-sm-0 mb-3"
                placeholder="Type a message"
                rows={1}
                spellCheck={false}
                onChange={(e) => setText(e.target.value)}
              ></textarea>
              <div className="position-relative">
                <button
                  type="button"
                  className="btn btn-sm btn-danger-soft ms-sm-2 position-relative"
                  onClick={() => setOpenEmoji(!isOpenEmoji)}
                >
                  <FontAwesomeIcon className="fs-6" icon={faFaceSmile} />
                </button>
                <div
                  ref={emojiRef}
                  className="position-absolute bottom-100 end-0"
                >
                  <EmojiPicker
                    open={isOpenEmoji}
                    onEmojiClick={(emojiData) =>
                      setText((prev) => prev + emojiData.emoji)
                    }
                  />
                </div>
              </div>
              <label
                htmlFor="file"
                className="btn btn-sm btn-secondary-soft ms-2"
              >
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
              <button className="btn btn-sm btn-primary ms-2" type="submit">
                <FontAwesomeIcon icon={faPaperPlane} className="fs-6" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
