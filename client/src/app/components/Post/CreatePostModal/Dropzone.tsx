"use client";
import { FilePreview } from "@/app/types";
import { Images } from "react-bootstrap-icons";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";

interface DropzoneProps {
  setFiles: React.Dispatch<React.SetStateAction<FilePreview[]>>;
  maxFiles?: number;
  maxSize?: number;
}

export default function Dropzone({
  setFiles,
  maxFiles = 12,
  maxSize = 1024 * 1024 * 1024,
}: DropzoneProps) {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
      "video/*": [],
    },
    maxFiles,
    maxSize,
    onDrop: (acceptedFiles, fileRejections) => {
      if (fileRejections.length) {
        switch (fileRejections[0].errors[0].code) {
          case "file-too-large":
            toast.error("File too large. Max file size is 1GB.");
            break;
          case "too-many-files":
            toast.error(`Too many files. Max files is ${maxFiles}.`);
            break;
          case "file-invalid-type":
            toast.error("Invalid file type.");
            break;
          default:
            toast.error("Something went wrong.");
        }
        return;
      }

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
        Upload attachment (Max {maxFiles} files, max 1GB)
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