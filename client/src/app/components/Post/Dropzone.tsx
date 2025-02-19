"use client";
import { FilePreview } from "@/app/types";
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
      let targetImage: HTMLImageElement;

      const filePreviews = await new Promise<FilePreview[]>(async (resolve) => {
        const files: FilePreview[] = [];
        for (const file of acceptedFiles) {
          const reader = new FileReader();
          const image = new Image();

          const filePreview = await new Promise<FilePreview>((resolve) => {
            reader.onload = () => {
              if (file.type.includes("video")) {
                const filePreview = Object.assign(file, {
                  preview: reader.result,
                }) as FilePreview;
                console.log(filePreview);
                resolve(filePreview);
              }
              image.src = reader.result as string;
            };

            reader.readAsDataURL(file);
            image.onload = async () => {
              if (!targetImage || image.height < targetImage.height) {
                targetImage = image;
              }

              const canvas = document.createElement("canvas");
              const ctx = canvas.getContext("2d");

              if (!ctx) return;

              canvas.width = targetImage.width;
              canvas.height = targetImage.height;

              const aspectRatio = targetImage.width / targetImage.height;
              let cropWidth, cropHeight;
              if (image.width / image.height > aspectRatio) {
                cropHeight = image.height;
                cropWidth = cropHeight * aspectRatio;
              } else {
                cropWidth = image.width;
                cropHeight = cropWidth / aspectRatio;
              }

              const cropX = (image.width - cropWidth) / 2;
              const cropY = (image.height - cropHeight) / 2;

              ctx.drawImage(
                image,
                cropX,
                cropY,
                cropWidth,
                cropHeight,
                0,
                0,
                targetImage.width,
                targetImage.height
              );

              const filePreview = await new Promise<FilePreview>((resolve) => {
                canvas.toBlob((blob) => {
                  if (!blob) return;
                  const newFile = new File([blob], file.name, {
                    type: file.type,
                    lastModified: file.lastModified,
                  }) as FilePreview;
                  newFile.preview = URL.createObjectURL(blob);
                  resolve(newFile);
                });
              });

              resolve(filePreview);
            };
          });

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
