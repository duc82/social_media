"use client";
import Avatar from "@/app/components/Avatar";
import formatName from "@/app/utils/formatName";
import Link from "next/link";
import {
  BookmarkCheck,
  Calendar2EventFill,
  CameraReelsFill,
  EmojiSmileFill,
  Envelope,
  ImageFill,
  PencilSquare,
  ThreeDots,
} from "react-bootstrap-icons";
import CreatePostModal from "./CreateModal";
import { FullUser } from "@/app/types/user";
import { useState } from "react";

export default function SharePost({ currentUser }: { currentUser: FullUser }) {
  const [isActiveDropzone, setActiveDropzone] = useState(false);

  const fullName = formatName(currentUser.firstName, currentUser.lastName);

  return (
    <>
      <CreatePostModal
        currentUser={currentUser}
        initialActiveDropzone={isActiveDropzone}
      />
      <div className="card card-body flex-grow-0">
        <div className="d-flex mb-3">
          <div className="avatar avatar-xs me-2">
            <Avatar
              className="avatar-img rounded-circle"
              src={currentUser.profile.avatar || ""}
              alt={fullName}
            />
          </div>
          <form className="w-100">
            <input
              className="form-control pe-4 border-0"
              placeholder="Share your thoughts..."
              data-bs-toggle="modal"
              data-bs-target="#createPostModal"
              onClick={() => setActiveDropzone(false)}
            />
          </form>
        </div>

        <ul className="nav gap-3">
          <li className="nav-item">
            <button
              type="button"
              className="nav-link rounded-2 bg-light py-1 px-2 d-flex align-items-center fw-normal"
              data-bs-toggle="modal"
              data-bs-target="#createPostModal"
              onClick={() => setActiveDropzone(true)}
            >
              <ImageFill className="text-success pe-2" size={20} />
              Photo
            </button>
          </li>
          <li className="nav-item">
            <button
              type="button"
              className="nav-link rounded-2 bg-light py-1 px-2 d-flex align-items-center fw-normal"
              data-bs-toggle="modal"
              data-bs-target="#createPostModal"
              onClick={() => setActiveDropzone(true)}
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
              data-bs-toggle="modal"
              data-bs-target="#createFeelingActivityModal"
              onClick={() => setActiveDropzone(false)}
            >
              <EmojiSmileFill className="text-warning pe-2" size={20} />
              Feeling / Activity
            </button>
          </li>
          <li className="nav-item dropdown ms-sm-auto">
            <button
              type="button"
              className="nav-link bg-light py-1 px-2 mb-0 rounded-2"
              id="feedActionShare"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <ThreeDots />
            </button>
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="feedActionShare"
            >
              <li>
                <Link className="dropdown-item" href="#">
                  <Envelope width={23} className="pe-2" />
                  Create a poll
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" href="#">
                  <BookmarkCheck width={23} className="pe-2" />
                  Ask a question
                </Link>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <Link className="dropdown-item" href="#">
                  <PencilSquare width={23} className="pe-2" />
                  Help
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </>
  );
}
