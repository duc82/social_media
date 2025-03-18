"use client";
import { FilePreview } from "@/app/types";
import getFilePreview from "@/app/utils/getFilePreview";
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
    onDrop: async (acceptedFiles) => {
      const filePreviews = await new Promise<FilePreview[]>(async (resolve) => {
        const files: FilePreview[] = [];
        for (const file of acceptedFiles) {
          const filePreview = await getFilePreview(file);

          files.push(filePreview);
        }
        resolve(files);
      });

      setFiles((prev) => [...prev, ...filePreviews]);
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
