import { formatDate } from "@/app/utils/dateTime";
import Avatar from "../Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCheckDouble } from "@fortawesome/free-solid-svg-icons";
import { Message } from "@/app/types/message";
import { useSession } from "next-auth/react";
import clsx from "clsx";

export default function MessageItem(message: Message) {
  const { data } = useSession();
  const currentUser = data?.user!;

  const isMessageCurrentUser = message.user.id === currentUser.id;

  return (
    <li>
      {/* Chat time */}
      <div className="text-center small my-2">
        {formatDate(Date.now(), {
          timeStyle: "short",
          dateStyle: "medium",
        })}
      </div>

      {/* Chat message left */}
      {!isMessageCurrentUser && (
        <div className="d-flex mb-1">
          <Avatar
            wrapperClassName="flex-shrink-0 avatar avatar-xs me-2"
            className="rounded-circle"
            src="/01.jpg"
            alt="Avatar"
          />
          <div className="flex-grow-1">
            <div className="w-100">
              <div className="d-flex flex-column align-items-start">
                <div className="bg-light text-secondary p-2 px-3 rounded-2">
                  {message.content}
                </div>
                <div className="small my-2">6:15 AM</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isMessageCurrentUser && (
        <div className="d-flex justify-content-end text-end mb-1">
          <div className="w-100">
            <div className="d-flex flex-column align-items-end">
              <div className="bg-primary text-white p-2 px-3 rounded-2">
                {message.content}
              </div>
              <div className="d-flex my-2">
                <div className="small text-secondary">
                  {formatDate(message.createdAt, { timeStyle: "short" })}
                </div>
                <div className="small ms-2">
                  {message.seen ? (
                    <FontAwesomeIcon
                      icon={faCheckDouble}
                      className="text-info"
                    />
                  ) : (
                    <FontAwesomeIcon icon={faCheck} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </li>
  );
}
