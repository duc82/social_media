"use client";

import { FilePreview } from "@/app/types";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, useState } from "react";
import CreateStoryModal from "./CreateModal";

export default function CreateStory() {
  const [file, setFile] = useState<FilePreview | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0] as FilePreview;

    const preview = URL.createObjectURL(file);
    file.preview = preview;
    setFile(file);
  };

  const resetFile = () => {
    setFile(null);
  };

  return (
    <>
      <div className="position-relative">
        <div
          className="card border border-2 border-dashed px-4 shadow-none d-flex align-items-center justify-content-center text-center"
          style={{ width: 136, height: 150 }}
        >
          <label
            htmlFor="storyFile"
            data-bs-toggle="modal"
            data-bs-target="#createStoryModal"
            className="stretched-link btn btn-light rounded-circle icon-md"
          >
            <FontAwesomeIcon icon={faPlus} />
            <input
              type={file ? "hidden" : "file"}
              id="storyFile"
              onChange={handleChange}
              hidden
            />
          </label>
          <h6 className="mt-2 mb-0 small">
            Post a<br />
            Story
          </h6>
        </div>
      </div>
      <CreateStoryModal file={file} resetFile={resetFile} />
    </>
  );
}
