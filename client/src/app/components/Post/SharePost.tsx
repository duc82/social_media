"use client";
import Avatar from "@/app/components/Avatar";
import CreatePostModal from "./CreateModal";
import { FullUser } from "@/app/types/user";
import { useState } from "react";

export default function SharePost({ currentUser }: { currentUser: FullUser }) {
  const [isActiveDropzone, setActiveDropzone] = useState(false);

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
              src={currentUser.profile.avatar}
              alt={currentUser.fullName}
            />
          </div>
          <form className="w-100">
            <input
              className="form-control pe-4 border-0"
              placeholder="Share your thoughts..."
              data-bs-toggle="modal"
              data-bs-target="#createPostModal"
              readOnly
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
              <i className="bi bi-image-fill text-success pe-2"></i>
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
              <i className="bi bi-camera-reels-fill text-info pe-2"></i>
              Video
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
              <i className="bi bi-emoji-smile-fill text-warning pe-2"></i>
              Feeling / Activity
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}
