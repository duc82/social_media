"use client";
import { FilePreview } from "@/app/types";
import React from "react";
import { useDropzone } from "react-dropzone";

interface DropzoneProps {
  setFiles: React.Dispatch<React.SetStateAction<FilePreview[]>>;
  maxFiles?: number;
  maxSize?: number;
  setPreviewHeight: React.Dispatch<React.SetStateAction<number>>;
}

export default function Dropzone({
  setFiles,
  maxFiles,
  maxSize,
  setPreviewHeight,
}: DropzoneProps) {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
      "video/*": [],
    },
    maxFiles,
    maxSize,
    onDrop: async (acceptedFiles) => {
      let height = Infinity;
      acceptedFiles.forEach((file) => {
        const preview = URL.createObjectURL(file);
        const image = new Image();
        image.src = preview;
        image.onload = () => {
          height = Math.min(height, image.height);
          setPreviewHeight(height);
        };

        setFiles((prev) => [...prev, Object.assign(file, { preview })]);
      });
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
          <i className="bi bi-images display-3"></i>
          <p>Drag here or click to upload photo/video.</p>
        </div>
      </div>
    </div>
  );
}
