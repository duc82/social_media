"use client";
import storyService from "@/app/services/storyService";
import { FilePreview } from "@/app/types";
import Cropper from "cropperjs";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Spinner from "../Spinner";
import VideoPlayer from "@/app/libs/VideoPlayer";
import { Story } from "@/app/types/story";

export default function CreateStoryModal({
  file,
  resetFile,
  handleAddStory,
}: {
  file: FilePreview | null;
  resetFile: () => void;
  handleAddStory?: (story: Story) => void;
}) {
  const [cropper, setCropper] = useState<Cropper | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { data: session, update } = useSession();
  const token = session?.token;
  const user = session?.user;

  const imageRef = useRef<HTMLImageElement>(null);
  const btnCloseRef = useRef<HTMLButtonElement>(null);

  const onCrop = async (name: string, type: string) => {
    if (!cropper) {
      throw new Error("Cropper is not initialized");
    }

    const canvas = cropper.getCroppedCanvas();

    return await new Promise<File>((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) return reject("Failed to crop image");
        const newFile = new File([blob], name, { type });
        resolve(newFile);
      });
    });
  };

  const handleShareStory = async () => {
    if (!file || !token) return;

    const newFile = file.type.includes("image/")
      ? await onCrop(file.name, file.type)
      : file;

    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("file", newFile);

      const { story } = await storyService.create(formData, token);
      if (user?.id === story.user.id) {
        user.stories.unshift(story);
        await update({
          stories: user.stories,
        });
      }
      resetFile();
      btnCloseRef.current?.click();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const image = imageRef.current;
    if (!image || !file) return;

    const cropper = new Cropper(image, {
      viewMode: 3,
      dragMode: "move",
      zoomable: false,
      movable: false,
      autoCropArea: 1,
    });
    setCropper(cropper);

    return () => {
      cropper.destroy();
    };
  }, [file]);

  return (
    <div className="modal fade" id="createStoryModal">
      <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Share your story</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              ref={btnCloseRef}
            ></button>
          </div>
          <div className="modal-body">
            <div>
              {file && file.type.includes("image/") && (
                <Image
                  src={file.preview}
                  alt={file.name}
                  width={0}
                  height={0}
                  className="img-fluid w-100"
                  ref={imageRef}
                />
              )}

              {file && file.type.includes("video/") && (
                <VideoPlayer src={file.preview} />
              )}

              {!file && <div style={{ height: 200 }}></div>}
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-light"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              Discard
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleShareStory}
              disabled={isLoading}
            >
              {isLoading ? <Spinner /> : "Share to Story"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
