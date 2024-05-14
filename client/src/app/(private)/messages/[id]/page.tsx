import Avatar from "@/app/components/Avatar";
import MessageList from "@/app/components/Messages/MessageList";
import {
  faCircle,
  faFaceSmile,
  faPaperPlane,
  faPaperclip,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import {
  Archive,
  CameraVideoFill,
  CheckLg,
  MicMute,
  PersonCheck,
  TelephoneFill,
  ThreeDotsVertical,
  Trash,
} from "react-bootstrap-icons";

export default function Messages() {
  return (
    <div className="col-lg-8 col-xxl-9">
      <div className="card card-chat rounded-start-lg-0 border-start-lg-0 h-100">
        <div className="card-body">
          {/* Top avatar and status */}
          <div className="d-sm-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center mb-2 mb-sm-0">
              <Avatar
                wrapperClassName="flex-shrink-0 me-2"
                className="rounded-circle"
                src={"/01.jpg"}
                alt={"Avatar"}
              />
              <div>
                <h6 className="mb-0 mt-1">Judy Nguyen</h6>
                <div className="small">
                  <FontAwesomeIcon
                    icon={faCircle}
                    className="text-success me-1"
                  />
                  Online
                </div>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <Link
                href="/"
                className="icon-md rounded-circle btn btn-primary-soft me-2 px-2"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                data-bs-title="Audio call"
              >
                <TelephoneFill />
              </Link>
              <Link
                href="/"
                className="icon-md rounded-circle btn btn-primary-soft me-2 px-2"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                data-bs-title="Video call"
              >
                <CameraVideoFill />
              </Link>
              <div className="dropdown">
                <button
                  type="button"
                  className="icon-md rounded-circle btn btn-primary-soft me-2 px-2"
                  data-bs-toggle="dropdown"
                  data-bs-auto-close="outside"
                >
                  <ThreeDotsVertical />
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <Link className="dropdown-item" href="#">
                      <CheckLg className="me-2 fw-icon" />
                      Mark as read
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" href="#">
                      <MicMute className="me-2 fw-icon" />
                      Mute conversation
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" href="#">
                      <PersonCheck className="me-2 fw-icon" />
                      View profile
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" href="#">
                      <Trash className="me-2 fw-icon" />
                      Delete chat
                    </Link>
                  </li>
                  <li className="dropdown-divider"></li>
                  <li>
                    <Link className="dropdown-item" href="#">
                      <Archive className="me-2 fw-icon" />
                      Archive chat
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <hr />
          {/* Messages */}
          <MessageList />
        </div>
        <div className="card-footer">
          <div className="d-sm-flex align-items-end">
            <textarea
              className="form-control mb-sm-0 mb-3"
              placeholder="Type a message"
              rows={1}
              style={{ height: 41 }}
            ></textarea>
            <button
              type="button"
              className="btn btn-sm btn-danger-soft ms-sm-2"
            >
              <FontAwesomeIcon className="fs-6" icon={faFaceSmile} />
            </button>
            <button
              type="button"
              className="btn btn-sm btn-secondary-soft ms-2"
            >
              <FontAwesomeIcon className="fs-6" icon={faPaperclip} />
            </button>
            <button type="button" className="btn btn-sm btn-primary ms-2">
              <FontAwesomeIcon className="fs-6" icon={faPaperPlane} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
