"use client";

import { Session } from "next-auth";
import { PostDto } from "@/app/types/post";
import { useForm } from "react-hook-form";
import Avatar from "../../Avatar";
import {
  Calendar2EventFill,
  EmojiSmileFill,
  GeoAltFill,
  ImageFill,
  TagFill,
} from "react-bootstrap-icons";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import postService from "@/app/services/postService";
import handlingError from "@/app/utils/error";
import useBootstrap from "@/app/hooks/useBootstrap";
import { FilePreview } from "@/app/types";
import Dropzone from "./Dropzone";

export default function CreatePostModal({
  session,
}: {
  session: Session | null;
}) {
  const [isActivePhotoVideo, setActivePhotoVideo] = useState(false);
  const [files, setFiles] = useState<FilePreview[]>([]);

  const modalRef = useRef<HTMLDivElement>(null);
  const bootstrap = useBootstrap();

  const { register, handleSubmit, reset } = useForm<PostDto>();

  const closeModal = () => {
    setFiles([]);
    setActivePhotoVideo(false);
    reset();
    if (modalRef.current && bootstrap) {
      bootstrap.Modal.getOrCreateInstance(modalRef.current).hide();
    }
  };

  const onSubmit = async (data: PostDto) => {
    if (!data.content && !files.length) {
      toast.error("Please fill all fields");
      return;
    }

    const formData = new FormData();

    formData.append("content", data.content ?? "");
    formData.append("audience", data.audience);
    for (const file of files) {
      formData.append("files[]", file);
    }

    try {
      const value = await postService.create(
        formData,
        session?.accessToken ?? ""
      );
      closeModal();
    } catch (error) {
      toast.error(handlingError(error));
    }
  };

  return (
    <div className="modal fade" id="createPostModal" ref={modalRef}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Create post</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <form className="w-100" onSubmit={handleSubmit(onSubmit)}>
            <div className="modal-body">
              <div className="d-flex mb-3">
                <Avatar
                  wrapperClassName="avatar avatar-xs me-2"
                  className="avatar-img rounded-circle"
                  src={session?.user.profile.avatar ?? ""}
                  alt={session?.user.fullName}
                />

                <textarea
                  className="form-control pe-4 fs-3 lh-1 border-0"
                  rows={4}
                  placeholder="Share your thoughts..."
                  autoFocus
                  {...register("content")}
                ></textarea>
              </div>
              {isActivePhotoVideo && (
                <Dropzone files={files} setFiles={setFiles} />
              )}
              {files.length > 0 && (
                <div className="row g-2 mb-3">
                  {files.map((file) => (
                    <div className="col-3" key={file.preview}>
                      <div className="card">
                        <img
                          src={file.preview}
                          alt={file.name}
                          width={120}
                          height={120}
                          className="card-img object-fit-cover"
                          onLoad={() => URL.revokeObjectURL(file.preview)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className="hstack gap-2">
                <button
                  type="button"
                  className="icon-md bg-success bg-opacity-10 text-success rounded-circle cursor-pointer border-0"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  data-bs-title="Photo/Video"
                  onClick={() => setActivePhotoVideo(!isActivePhotoVideo)}
                >
                  <ImageFill />
                </button>
                <button
                  className="icon-md bg-danger bg-opacity-10 text-danger rounded-circle border-0"
                  type="button"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  data-bs-title="Events"
                >
                  <Calendar2EventFill />
                </button>
                <a
                  className="icon-md bg-warning bg-opacity-10 text-warning rounded-circle"
                  href="#"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  data-bs-title="Feeling/Activity"
                >
                  <EmojiSmileFill />
                </a>
                <a
                  className="icon-md bg-light text-secondary rounded-circle"
                  href="#"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  data-bs-title="Check in"
                >
                  <GeoAltFill />
                </a>
                <a
                  className="icon-md bg-primary bg-opacity-10 text-primary rounded-circle"
                  href="#"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  data-bs-title="Tag people on top"
                >
                  <TagFill />
                </a>
              </div>
            </div>

            <div className="modal-footer row justify-content-between">
              <div className="col-lg-3">
                <select className="form-select" {...register("audience")}>
                  <option value="public" defaultChecked>
                    Public
                  </option>
                  <option value="friends">Friends</option>
                  <option value="private">Private</option>
                </select>
              </div>
              <div className="col-lg-8 text-sm-end">
                <button type="submit" className="btn btn-success">
                  Post
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
