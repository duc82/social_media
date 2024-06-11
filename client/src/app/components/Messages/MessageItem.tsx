import { formatDate } from "@/app/utils/dateTime";
import Avatar from "../Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCheckDouble } from "@fortawesome/free-solid-svg-icons";
import { Message } from "@/app/types/message";

interface MessageItemProps {
  message: Message;
  isSameUser: boolean;
  isSameDay: boolean;
  isShowStatus: boolean;
}

export default function MessageItem({
  message,
  isSameUser,
  isSameDay,
  isShowStatus,
}: MessageItemProps) {
  return (
    <div id={message.id}>
      {/* Chat time */}
      {isSameDay && (
        <div className="text-center small my-2">
          {formatDate(message.createdAt, {
            timeStyle: "short",
            dateStyle: "medium",
          })}
        </div>
      )}

      {/* Chat message left */}
      {!isSameUser && (
        <div className="d-flex mb-1">
          <Avatar
            wrapperClassName="flex-shrink-0 avatar avatar-xs me-2"
            className="rounded-circle"
            src={message.user.profile.avatar}
            alt={message.user.fullName}
          />
          <div className="flex-grow-1">
            <div className="w-100">
              <div className="d-flex flex-column align-items-start">
                <div className="bg-light text-secondary p-2 px-3 rounded-2">
                  {message.content}
                </div>
                <div className="small my-2">
                  {formatDate(message.createdAt, { timeStyle: "short" })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isSameUser && (
        <div className="d-flex justify-content-end text-end mb-1">
          <div className="w-100">
            <div className="d-flex flex-column align-items-end">
              <div className="bg-primary text-white p-2 px-3 rounded-2">
                {message.content}
              </div>

              {isShowStatus && (
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
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
