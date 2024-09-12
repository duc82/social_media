"use client";
import { FilePreview } from "@/app/types";
import React from "react";
import { Images } from "react-bootstrap-icons";
import { useDropzone } from "react-dropzone";

interface DropzoneProps {
  setFiles: React.Dispatch<React.SetStateAction<FilePreview[]>>;
  maxFiles?: number;
  maxSize?: number;
}

export default function Dropzone({
  setFiles,
  maxFiles,
  maxSize,
}: DropzoneProps) {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
      "video/*": [],
    },
    maxFiles,
    maxSize,
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  return (
    <div className="mb-3">
      <label htmlFor="" className="form-label">
        Upload attachment
      </label>
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <div className="dz-message">
          <Images className="display-3" />
          <p>Drag here or click to upload photo/video.</p>
        </div>
      </div>
    </div>
  );
}
