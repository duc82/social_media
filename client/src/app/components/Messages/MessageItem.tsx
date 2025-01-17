import { formatDate, formatDateTime } from "@/app/utils/dateTime";
import Avatar from "../Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckDouble } from "@fortawesome/free-solid-svg-icons";
import { Message } from "@/app/types/message";

import Image from "next/image";
import Link from "next/link";
import Fancybox from "@/app/libs/FancyBox";
import clsx from "clsx";

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
        <div className="text-center small my-4" suppressHydrationWarning>
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
                alt={message.user.fullName}
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

                {message.call && (
                  <div className="bg-light d-flex align-items-center cursor-pointer text-secondary p-2 px-3 rounded-2">
                    {message.call.status === "success" && ""}
                    {message.call.status === "failed" && (
                      <div
                        className="bg-danger d-inline-flex align-items-center justify-content-center rounded-circle text-white"
                        style={{
                          width: 36,
                          height: 36,
                        }}
                      >
                        <i
                          className={clsx(
                            "bi",
                            message.call.type === "video"
                              ? "bi-camera-video-off-fill"
                              : "bi-telephone-x-fill"
                          )}
                        ></i>
                      </div>
                    )}
                    <span className="ms-2 fw-semibold">
                      Missed {message.call.type} <br /> call
                    </span>
                  </div>
                )}

                {isShowStatus && (
                  <span
                    className="small my-2"
                    title={formatDate(message.createdAt, {
                      timeStyle: "medium",
                      dateStyle: "medium",
                    })}
                    suppressHydrationWarning
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
        <div className="ms-auto mb-1" style={{ maxWidth: "90%" }}>
          <div className="d-flex flex-column align-items-end">
            <div
              data-bs-toggle="tooltip"
              data-bs-title={formatDate(message.createdAt, {
                dateStyle: "medium",
                timeStyle: "short",
              })}
              data-bs-placement="left"
            >
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

              {message.call && (
                <div className="bg-light text-secondary cursor-pointer p-2 px-3 rounded-2 d-flex align-items-center">
                  {message.call.status === "success" && ""}
                  {message.call.status === "failed" && (
                    <i
                      className={clsx(
                        "bi",
                        message.call.type === "video"
                          ? "bi-camera-video-off-fill"
                          : "bi-telephone-x-fill"
                      )}
                    ></i>
                  )}
                  <span className="ms-2 fw-semibold">
                    {message.call.type[0].toUpperCase() +
                      message.call.type.slice(1)}{" "}
                    call
                  </span>
                </div>
              )}
            </div>

            {isShowStatus && (
              <div className="d-flex align-items-center my-2 small">
                <span
                  title={formatDate(message.createdAt, {
                    timeStyle: "medium",
                    dateStyle: "medium",
                  })}
                  suppressHydrationWarning
                >
                  {formatDate(message.createdAt, { timeStyle: "short" })}
                </span>

                <FontAwesomeIcon
                  icon={faCheckDouble}
                  className="text-info ms-2"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
