"use client";

import { Feeling, PostDto } from "@/app/types/post";
import { useForm } from "react-hook-form";
import Avatar from "../Avatar";
import { useEffect, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";
import postService from "@/app/services/postService";
import handlingError from "@/app/utils/error";
import useBootstrapContext from "@/app/hooks/useBootstrapContext";
import { FilePreview } from "@/app/types";
import Dropzone from "./Dropzone";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { FullUser } from "@/app/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { POST_ACCESS, postSchema } from "@/app/schemas/post";

import Spinner from "../Spinner";
import TagPeopleModal from "./TagPeopleModal";
import FeelingActivityModal from "./FeelingActivityModal";
import usePostContext from "@/app/hooks/usePostContext";
import VideoPlayer from "@/app/libs/VideoPlayer";
import EditPhotoModal from "./EditPhotoPanel";
import EditPhoto from "./EditPhotoPanel";
import EditPhotoPanel from "./EditPhotoPanel";
import EditPhotosPanel from "./EditPhotosPanel";

export default function CreatePostModal({
  initialActiveDropzone = false,
  currentUser,
}: {
  initialActiveDropzone?: boolean;
  currentUser: FullUser;
}) {
  const [tab, setTab] = useState<"home" | "photosVideos" | "emoji">("home");
  const [isActiveDropzone, setActiveDropzone] = useState(false);
  const [files, setFiles] = useState<FilePreview[]>([]);
  const { setPosts } = usePostContext();
  const { data: session } = useSession();
  const token = session?.token;

  const modalRef = useRef<HTMLDivElement>(null);
  const bootstrap = useBootstrapContext();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { isSubmitting },
  } = useForm<PostDto>({
    resolver: zodResolver(postSchema),
  });

  const content = watch("content");
  const feeling = watch("feeling");
  const activity = watch("activity");

  const setFeeling = (feeling: Feeling | null) => {
    if (feeling) {
      setValue("feeling", [feeling.emoji, feeling.name]);
    }
  };

  const clearFiles = () => {
    setFiles([]);
    setActiveDropzone(false);
    for (const file of files) {
      URL.revokeObjectURL(file.preview);
    }
  };

  const closeModal = () => {
    setFiles([]);
    setActiveDropzone(false);
    reset();
    if (modalRef.current && bootstrap) {
      bootstrap.Modal.getOrCreateInstance(modalRef.current).hide();
    }
  };

  const onSubmit = async (data: PostDto) => {
    if (!token) return;

    if (!data.content && !files.length) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("content", data.content || "");
      formData.append("access", data.access);
      if (data.feeling) {
        formData.append("feeling", JSON.stringify(data.feeling));
      }

      if (data.activity) {
        formData.append("activity", JSON.stringify(data.activity));
      }

      for (const file of files) {
        formData.append("files", file);
      }

      const { post } = await postService.create(formData, token);
      setPosts((prev) => [post, ...prev]);
      closeModal();
    } catch (error) {
      toast.error(handlingError(error));
    }
  };

  useEffect(() => {
    setActiveDropzone(initialActiveDropzone);
  }, [initialActiveDropzone]);

  const filePreviews = useMemo(() => files.slice(0, 5), [files]);

  return (
    <>
      <TagPeopleModal />
      <FeelingActivityModal
        currentFeeling={
          feeling ? { emoji: feeling[0], name: feeling[1] } : null
        }
        setFeeling={setFeeling}
        id="createFeelingActivityModal"
        target="#createPostModal"
      />
      <div className="modal fade" id="createPostModal" ref={modalRef}>
        <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
          <div className="modal-content tab-content">
            <div className={clsx("tab-pane", tab === "home" && "show active")}>
              <div className="modal-header">
                <h5 className="modal-title">Create post</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="modal-body" style={{ maxHeight: 768 }}>
                  <div className="d-flex align-items-center mb-3">
                    <div className="avatar avatar-xs me-2">
                      <Avatar
                        className="avatar-img rounded-circle"
                        src={currentUser.profile.avatar}
                        alt={currentUser.fullName}
                      />
                    </div>

                    <span className="fw-semibold">
                      {currentUser.fullName}{" "}
                      {feeling && (
                        <span>
                          is {feeling[0]} feeling
                          <button
                            type="button"
                            data-bs-toggle="modal"
                            data-bs-target="#feelingActivityModal"
                            className="btn btn-link p-0 text-decoration-underline"
                          >
                            {feeling[1]}
                          </button>
                        </span>
                      )}
                      {activity && (
                        <span>
                          is {activity[0]} {activity[1]}
                          <button
                            type="button"
                            data-bs-toggle="modal"
                            data-bs-target="#feelingActivityModal"
                            className="btn btn-link p-0 text-decoration-underline"
                          >
                            {activity[2]}
                          </button>
                        </span>
                      )}
                    </span>
                  </div>

                  <textarea
                    className={clsx(
                      "form-control p-0 lh-1 border-0 mb-3",
                      content && content.length > 85 ? "fs-5" : "fs-4"
                    )}
                    rows={4}
                    placeholder="Share your thoughts..."
                    autoFocus
                    {...register("content")}
                  ></textarea>
                  {isActiveDropzone && !files.length && (
                    <Dropzone setFiles={setFiles} />
                  )}
                  {files.length > 0 && (
                    <div className="row g-1 mb-3 position-relative">
                      {filePreviews.map((file, index) => (
                        <div
                          key={file.preview}
                          className={clsx(
                            files.length % 2 === 0 &&
                              files.length < 5 &&
                              "col-6",
                            files.length === 1 && "col-12",
                            files.length === 3 &&
                              (index === 0 ? "col-12" : "col-6"),
                            files.length >= 5 && (index > 1 ? "col-4" : "col-6")
                          )}
                        >
                          <div className="card border-0">
                            {file.type.includes("image") && (
                              <img
                                src={file.preview}
                                alt={file.name}
                                className="card-img object-fit-cover h-100"
                                onLoad={() => URL.revokeObjectURL(file.preview)}
                              />
                            )}

                            {file.type.includes("video") && (
                              <VideoPlayer src={file.preview} />
                            )}
                            {index === filePreviews.length - 1 &&
                              files.length > 5 && (
                                <div className="w-100 h-100 position-absolute top-0 start-0 d-flex align-items-center justify-content-center bg-black bg-opacity-25">
                                  <span className="text-white fs-2 font-semibold">
                                    +{files.length - filePreviews.length}
                                  </span>
                                </div>
                              )}
                          </div>
                        </div>
                      ))}
                      <div
                        className="position-absolute d-flex align-items-center justify-content-between z-index-1"
                        style={{ top: 12, left: 0, padding: "0 12px" }}
                      >
                        <div>
                          <button
                            type="button"
                            onClick={() => {
                              setTab("photosVideos");
                            }}
                            className="me-2 px-2 py-1 d-inline-flex aligin-items-center justify-content-center mt-0 rounded-2 bg-white border-0 shadow-sm"
                          >
                            <i className="bi bi-pencil-fill me-1"></i>
                            <span>Edit {files.length > 1 && "All"}</span>
                          </button>

                          <button
                            type="button"
                            className="px-2 py-1 d-inline-flex aligin-items-center justify-content-center mt-0 rounded-2 bg-white border-0 shadow-sm"
                          >
                            <i className="bi bi-file-earmark-plus-fill me-1"></i>
                            <span>Add Photos/Videos</span>
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={clearFiles}
                          className="d-flex align-items-center justify-content-center mt-0 rounded-circle bg-white border-0 shadow-sm"
                          style={{ height: 30, width: 30 }}
                        >
                          <i className="bi bi-x-lg"></i>
                        </button>
                      </div>
                    </div>
                  )}
                  <div className="hstack gap-2">
                    <button
                      type="button"
                      className="icon-md bg-success bg-opacity-10 text-success rounded-circle cursor-pointer border-0"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      data-bs-title="Photo/Video"
                      data-bs-trigger="hover"
                      onClick={() => {
                        if (files.length === 0) {
                          setActiveDropzone(!isActiveDropzone);
                        }
                      }}
                    >
                      <i className="bi bi-image-fill"></i>
                    </button>
                    <button
                      type="button"
                      className="icon-md bg-warning bg-opacity-10 text-warning rounded-circle border-0"
                      data-bs-tooltip="true"
                      data-bs-placement="top"
                      data-bs-title="Feeling/Activity"
                      data-bs-trigger="hover"
                      data-bs-toggle="modal"
                      data-bs-target="#createFeelingActivityModal"
                    >
                      <i className="bi bi-emoji-smile-fill"></i>
                    </button>
                    <button
                      type="button"
                      className="icon-md bg-light text-secondary rounded-circle border-0"
                      data-bs-tooltip="true"
                      data-bs-placement="top"
                      data-bs-trigger="hover"
                      data-bs-title="Check in"
                      data-bs-toggle="modal"
                      data-bs-target="#checkInModal"
                    >
                      <i className="bi bi-geo-alt-fill"></i>
                    </button>
                    <button
                      type="button"
                      className="icon-md bg-primary bg-opacity-10 text-primary rounded-circle border-0"
                      data-bs-tooltip="true"
                      data-bs-placement="top"
                      data-bs-trigger="hover"
                      data-bs-title="Tag people on top"
                      data-bs-toggle="modal"
                      data-bs-target="#tagPeopleModal"
                    >
                      <i className="bi bi-tag-fill"></i>
                    </button>
                  </div>
                </div>

                <div className="modal-footer row justify-content-between">
                  <div className="col-lg-3">
                    <select className="form-select" {...register("access")}>
                      {POST_ACCESS.map((access) => {
                        const value = access[0].toUpperCase() + access.slice(1);
                        return (
                          <option key={access} value={access}>
                            {value}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="col-lg-8 text-sm-end">
                    <button
                      type="submit"
                      className="btn btn-success"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? <Spinner /> : "Post"}
                    </button>
                  </div>
                </div>
              </form>
            </div>

            <EditPhotosPanel
              files={files}
              setFiles={setFiles}
              active={tab === "photosVideos"}
              onClose={() => setTab("home")}
            />
          </div>
        </div>
      </div>
    </>
  );
}
