import { FilePreview } from "../types";

let targetImage: HTMLImageElement;

export default async function getFilePreview(file: File): Promise<FilePreview> {
  const image = new Image();

  const filePreview = await new Promise<FilePreview>((resolve) => {
    const preview = URL.createObjectURL(file);

    if (file.type.includes("video")) {
      const filePreview = Object.assign(file, {
        preview,
      });
      resolve(filePreview);
    }

    image.src = preview;

    image.onload = async () => {
      if (!targetImage || image.height < targetImage.height) {
        targetImage = image;
      }

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        throw new Error("Canvas 2d context is not supported in this browser");
      }

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

      const filePreview = await new Promise<FilePreview>((resolve, reject) => {
        canvas.toBlob((blob) => {
          if (!blob) return reject(new Error("Failed to create blob"));
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

  return filePreview;
}
