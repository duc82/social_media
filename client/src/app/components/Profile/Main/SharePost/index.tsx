import Image from "next/image";
import {
  Calendar2EventFill,
  CameraReelsFill,
  EmojiSmileFill,
  ImageFill,
} from "react-bootstrap-icons";

export default function SharePost() {
  return (
    <div className="card card-body flex-grow-0">
      <div className="d-flex mb-3">
        <div className="avatar avatar-xs me-2">
          <Image
            className="avatar-img rounded-circle"
            src="/07.jpg"
            fill
            alt="Avatar"
          />
        </div>
        <form className="w-100">
          <input
            className="form-control pe-4 border-0"
            placeholder="Share your thoughts..."
            data-bs-toggle="modal"
            data-bs-target="#createPostModal"
          />
        </form>
      </div>

      <ul className="nav gap-3">
        <li className="nav-item">
          <button
            type="button"
            className="nav-link rounded-2 bg-light py-1 px-2 d-flex align-items-center fw-normal"
          >
            <ImageFill className="text-success pe-2" size={20} />
            Photo
          </button>
        </li>
        <li className="nav-item">
          <button
            type="button"
            className="nav-link rounded-2 bg-light py-1 px-2 d-flex align-items-center fw-normal"
          >
            <CameraReelsFill className="text-info pe-2" size={20} />
            Video
          </button>
        </li>
        <li className="nav-item">
          <button
            type="button"
            className="nav-link rounded-2 bg-light py-1 px-2 d-flex align-items-center fw-normal"
          >
            <Calendar2EventFill className="text-danger pe-2" size={20} />
            Event
          </button>
        </li>
        <li className="nav-item">
          <button
            type="button"
            className="nav-link rounded-2 bg-light py-1 px-2 d-flex align-items-center fw-normal"
          >
            <EmojiSmileFill className="text-warning pe-2" size={20} />
            Feeling / Activity
          </button>
        </li>
        <li className="nav-item dropdown ms-sm-auto">
          <button
            type="button"
            className="nav-link bg-light py-1 px-2 mb-0"
            id="feedActionShare"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="bi bi-three-dots"></i>
          </button>
          <ul
            className="dropdown-menu dropdown-menu-end"
            aria-labelledby="feedActionShare"
          >
            <li>
              <a className="dropdown-item" href="#">
                <i className="bi bi-envelope fa-fw pe-2"></i>Create a poll
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                <i className="bi bi-bookmark-check fa-fw pe-2"></i>Ask a
                question{" "}
              </a>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <a className="dropdown-item" href="#">
                <i className="bi bi-pencil-square fa-fw pe-2"></i>Help
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}
