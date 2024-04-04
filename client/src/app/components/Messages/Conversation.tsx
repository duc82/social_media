"use client";

import {
  faFaceSmile,
  faPaperPlane,
  faPaperclip
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Conversation() {
  return (
    <div className="col-lg-8 col-xxl-9">
      <div className="card card-chat rounded-start-lg-0 border-start-lg-0">
        <div className="card-body h-100">
          <div className="tab-content py-0 mb-0 h-100"></div>
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
