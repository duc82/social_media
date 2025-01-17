"use client";
import {
  faCircle,
  faPaperclip,
  faSmile,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ChatToast() {
  const pathname = usePathname();

  if (pathname.includes("/messages")) {
    return null;
  }

  return (
    <div className="toast-container toast-chat d-flex gap-3 align-items-end">
      <div
        id="chatToast"
        className="toast mb-0 bg-mode fade"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        data-bs-autohide="false"
      >
        <div className="toast-header bg-mode">
          <div className="d-flex justify-content-between align-items-center w-100">
            <div className="d-flex">
              <div className="flex-shrink-0 avatar me-2">
                <Image
                  className="avatar-img rounded-circle"
                  src="/01.jpg"
                  width={0}
                  height={0}
                  sizes="100vw"
                  alt=""
                />
              </div>
              <div className="flex-grow-1">
                <h6 className="mb-0 mt-1">Frances Guerrero</h6>
                <div className="small text-secondary">
                  <FontAwesomeIcon
                    icon={faCircle}
                    className="text-success me-1"
                  />
                  Online
                </div>
              </div>
            </div>
            <div className="d-flex">
              <div className="dropdown">
                <Link
                  className="btn btn-secondary-soft-hover py-1 px-2"
                  href="#"
                  id="chatcoversationDropdown"
                  data-bs-toggle="dropdown"
                  data-bs-auto-close="outside"
                  aria-expanded="false"
                >
                  <i className="bi bi-three-dots-vertical"></i>
                </Link>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="chatcoversationDropdown"
                >
                  <li>
                    <Link className="dropdown-item" href="#">
                      <i className="bi bi-camera-video me-2 fw-icon"></i>Video
                      call
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" href="#">
                      <i className="bi bi-telephone me-2 fw-icon"></i>
                      Audio call
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" href="#">
                      <i className="bi bi-trash me-2 fw-icon"></i>
                      Delete{" "}
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" href="#">
                      <i className="bi bi-chat-square-text me-2 fw-icon"></i>
                      Mark as unread
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" href="#">
                      <i className="bi bi-volume-up me-2 fw-icon"></i>Muted
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" href="#">
                      <i className="bi bi-archive me-2 fw-icon"></i>Archive
                    </Link>
                  </li>
                  <li className="dropdown-divider"></li>
                  <li>
                    <Link className="dropdown-item" href="#">
                      <i className="bi bi-flag me-2 fw-icon"></i>Report
                    </Link>
                  </li>
                </ul>
              </div>
              <Link
                className="btn btn-secondary-soft-hover py-1 px-2"
                data-bs-toggle="collapse"
                href="#collapseChat"
                aria-expanded="false"
                aria-controls="collapseChat"
              >
                <i className="bi bi-dash-lg"></i>
              </Link>
              <button
                className="btn btn-secondary-soft-hover py-1 px-2"
                data-bs-dismiss="toast"
                aria-label="Close"
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>
          </div>
        </div>
        <div className="toast-body collapse show" id="collapseChat">
          <div className="mt-2">
            <textarea
              className="form-control mb-sm-0 mb-3"
              placeholder="Type a message"
              rows={1}
            ></textarea>
            <div className="d-sm-flex align-items-end mt-2">
              <button className="btn btn-sm btn-danger-soft me-2">
                <FontAwesomeIcon icon={faSmile} />
              </button>
              <button className="btn btn-sm btn-secondary-soft me-2">
                <FontAwesomeIcon icon={faPaperclip} />
              </button>
              <button className="btn btn-sm btn-success-soft me-2">
                {" "}
                Gif{" "}
              </button>
              <button className="btn btn-sm btn-primary ms-auto"> Send </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
