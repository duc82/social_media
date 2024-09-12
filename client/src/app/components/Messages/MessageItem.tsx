import { formatDate } from "@/app/utils/dateTime";
import Avatar from "../Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckDouble } from "@fortawesome/free-solid-svg-icons";
import { Message } from "@/app/types/message";
import formatName from "@/app/utils/formatName";
import Image from "next/image";
import Link from "next/link";
import Fancybox from "@/app/libs/FancyBox";

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
  const fullName = formatName(message.user.firstName, message.user.lastName);

  return (
    <div id={message.id}>
      {/* Chat time */}
      {isSameDay && (
        <div className="text-center small my-4">
          {formatDate(message.createdAt, {
            timeStyle: "short",
            dateStyle: "medium",
          })}
        </div>
      )}

      {/* Chat message left */}
      {!isSameUser && (
        <div className="d-flex mb-1">
          <button
            type="button"
            className="btn btn-link p-0 border-0 me-2 d-flex"
            data-bs-toggle="modal"
            data-bs-target="#profileModal"
          >
            <div className="flex-shrink-0 avatar avatar-xs">
              <Avatar
                className="rounded-circle"
                src={message.user.profile.avatar}
                alt={fullName}
              />
            </div>
          </button>

          <div className="flex-grow-1">
            <div className="w-100">
              <div className="d-flex flex-column align-items-start">
                {message.content && (
                  <div className="bg-light text-secondary p-2 px-3 rounded-2">
                    {message.content}
                  </div>
                )}

                {message.files.length > 0 && (
                  <Fancybox className="grid gap-2 mb-1">
                    {message.files.map((file) => (
                      <div className="g-col-12 g-col-md-6" key={file.id}>
                        <Link href={file.url} data-fancybox>
                          <Image
                            src={file.url}
                            alt={file.id}
                            width={200}
                            height={200}
                            className="rounded object-fit-cover"
                            priority
                          />
                        </Link>
                      </div>
                    ))}
                  </Fancybox>
                )}

                {isShowStatus && (
                  <span
                    className="small my-2"
                    title={formatDate(message.createdAt, {
                      timeStyle: "medium",
                      dateStyle: "medium",
                    })}
                  >
                    {formatDate(message.createdAt, { timeStyle: "short" })}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {isSameUser && (
        <div className="d-flex justify-content-end text-end mb-1">
          <div className="d-flex flex-column align-items-end">
            {message.content && (
              <div className="bg-primary text-white p-2 px-3 rounded-2">
                {message.content}
              </div>
            )}

            {message.files.length > 0 && (
              <Fancybox
                className="d-flex flex-wrap justify-content-end gap-2 mb-1"
                style={{ width: 408 }}
              >
                {message.files.map((file) => (
                  <Link href={file.url} key={file.id} data-fancybox>
                    <Image
                      src={file.url}
                      alt={file.id}
                      width={200}
                      height={200}
                      className="rounded object-fit-cover"
                      priority
                    />
                  </Link>
                ))}
              </Fancybox>
            )}

            {isShowStatus && (
              <div className="d-flex my-2">
                <span
                  className="small"
                  title={formatDate(message.createdAt, {
                    timeStyle: "medium",
                    dateStyle: "medium",
                  })}
                >
                  {formatDate(message.createdAt, { timeStyle: "short" })}
                </span>
                <div className="small ms-2">
                  <FontAwesomeIcon icon={faCheckDouble} className="text-info" />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
