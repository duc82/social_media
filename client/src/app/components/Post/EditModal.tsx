"use client";
import useBootstrapContext from "@/app/hooks/useBootstrapContext";
import { POST_ACCESS, postSchema } from "@/app/schemas/post";
import postService from "@/app/services/postService";
import { FilePreview } from "@/app/types";
import { Feeling, PostDto } from "@/app/types/post";
import handlingError from "@/app/utils/error";

import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import Avatar from "../Avatar";
import clsx from "clsx";
import Dropzone from "./Dropzone";
import Image from "next/image";
import Spinner from "../Spinner";
import FeelingActivityModal from "./FeelingActivityModal";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import usePostContext from "@/app/hooks/usePostContext";
import { useRouter } from "next-nprogress-bar";

export default function EditModal() {
  const { post } = usePostContext();
  const [isActiveDropzone, setActiveDropzone] = useState(false);
  const [previewHeight, setPreviewHeight] = useState(0);
  const [files, setFiles] = useState<FilePreview[]>([]);
  const { data: session } = useSession();
  const router = useRouter();
  const token = session?.token;
  const currentUser = session?.user;
  const modalRef = useRef<HTMLDivElement>(null);
  const bootstrap = useBootstrapContext();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { isSubmitting },
  } = useForm<PostDto>({
    resolver: zodResolver(postSchema),
  });

  const content = watch("content");
  const feeling = watch("feeling");

  const setFeeling = (feeling: Feeling | null) => {
    if (feeling) {
      setValue("feeling", [feeling.emoji, feeling.name]);
    }
  };

  const clearFiles = () => {
    setFiles([]);
    setActiveDropzone(false);
  };

  const closeModal = () => {
    setFiles([]);
    setActiveDropzone(false);
    if (modalRef.current && bootstrap) {
      bootstrap.Modal.getOrCreateInstance(modalRef.current).hide();
    }
  };

  const onSubmit = async (data: PostDto) => {
    if (!token || !post) return;
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

      files.forEach((file) => {
        formData.append("files[]", file);
      });

      await postService.update(post.id, formData, token);
      router.refresh();
      closeModal();
    } catch (error) {
      toast.error(handlingError(error));
    }
  };

  const filePreviews = files.slice(0, 5);

  useEffect(() => {
    if (post) {
      setValue("content", post.content);
      setValue("feeling", post.feeling || []);
      setValue("activity", post.activity || []);
      setValue("access", post.access);
    }
  }, [post, setValue]);

  return (
    <>
      <FeelingActivityModal
        currentFeeling={
          feeling ? { emoji: feeling[0], name: feeling[1] } : null
        }
        setFeeling={setFeeling}
        id="editFeelingActivityModal"
        target="#editPostModal"
      />
      <div className="modal fade" id="editPostModal" ref={modalRef}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit post</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div
                className="modal-body overflow-y-auto"
                style={{ maxHeight: 400 }}
              >
                <div className="d-flex align-items-center mb-3">
                  {currentUser && (
                    <div className="avatar avatar-xs me-2">
                      <Avatar
                        className="avatar-img rounded-circle"
                        src={currentUser.profile.avatar}
                        alt={currentUser.fullName}
                      />
                    </div>
                  )}

                  <span className="fw-semibold text-700">
                    {currentUser?.fullName}
                    {feeling && feeling.length > 0 && (
                      <span>
                        is {feeling[0]} feeling
                        <button
                          type="button"
                          data-bs-toggle="modal"
                          data-bs-target="#editFeelingActivityModal"
                          className="btn btn-link p-0 text-decoration-underline"
                        >
                          {feeling[1]}
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
                  id="content"
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
                          files.length % 2 === 0 && files.length < 5 && "col-6",
                          files.length === 1 && "col-12",
                          files.length === 3 &&
                            (index === 0 ? "col-12" : "col-6"),
                          files.length >= 5 && (index > 1 ? "col-4" : "col-6")
                        )}
                      >
                        <div
                          className="card border-0"
                          style={{ height: previewHeight }}
                        >
                          <Image
                            src={file.preview}
                            alt={file.name}
                            className="card-img object-fit-cover h-100"
                            onLoad={() => URL.revokeObjectURL(file.preview)}
                          />
                          {index === filePreviews.length - 1 &&
                            files.length > 5 && (
                              <div className="w-100 h-100 position-absolute d-flex align-items-center justify-content-center bg-black bg-opacity-25">
                                <span className="text-white fs-2 font-semibold">
                                  +{files.length - filePreviews.length}
                                </span>
                              </div>
                            )}
                        </div>
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={clearFiles}
                      className="position-absolute d-flex align-items-center justify-content-center mt-0 rounded-circle bg-white border-0 shadow-sm z-index-1"
                      style={{ height: 30, width: 30, top: 10, right: 12 }}
                    >
                      <i className="bi bi-x-lg"></i>
                    </button>
                  </div>
                )}

                {post && post.files.length > 0 && (
                  <div className="row g-1 mb-3 position-relative">
                    {post.files.map((file, index) => (
                      <div
                        key={file.url}
                        className={clsx(
                          files.length % 2 === 0 && files.length < 5 && "col-6",
                          files.length === 1 && "col-12",
                          files.length === 3 &&
                            (index === 0 ? "col-12" : "col-6"),
                          files.length >= 5 && (index > 1 ? "col-4" : "col-6")
                        )}
                      >
                        <div className="card border-0">
                          <Image
                            src={file.url}
                            alt={post.id}
                            width={0}
                            height={0}
                            sizes="100vw"
                            className="card-img object-fit-cover h-auto"
                          />
                          {index === filePreviews.length - 1 &&
                            files.length > 5 && (
                              <div className="w-100 h-100 position-absolute d-flex align-items-center justify-content-center bg-black bg-opacity-25">
                                <span className="text-white fs-2 font-semibold">
                                  +{files.length - filePreviews.length}
                                </span>
                              </div>
                            )}
                        </div>
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={clearFiles}
                      className="position-absolute d-flex align-items-center justify-content-center mt-0 rounded-circle bg-white border-0 shadow-sm z-index-1"
                      style={{ height: 30, width: 30, top: 10, right: 12 }}
                    >
                      <i className="bi bi-x-lg"></i>
                    </button>
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
                    onClick={() => setActiveDropzone(!isActiveDropzone)}
                  >
                    <i className="bi bi-image-fill"></i>
                  </button>
                  <button
                    className="icon-md bg-danger bg-opacity-10 text-danger rounded-circle border-0"
                    type="button"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    data-bs-trigger="hover"
                    data-bs-title="Events"
                  >
                    <i className="bi bi-calendar2-event-fill"></i>
                  </button>
                  <button
                    type="button"
                    className="icon-md bg-warning bg-opacity-10 text-warning rounded-circle border-0"
                    data-bs-tooltip="true"
                    data-bs-placement="top"
                    data-bs-title="Feeling/Activity"
                    data-bs-trigger="hover"
                    data-bs-toggle="modal"
                    data-bs-target="#editFeelingActivityModal"
                  >
                    <i className="bi bi-emoji-smile-fill"></i>
                  </button>
                  <button
                    type="button"
                    className="icon-md bg-light text-secondary rounded-circle border-0"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    data-bs-trigger="hover"
                    data-bs-title="Check in"
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
                  <select
                    className="form-select"
                    id="access"
                    {...register("access")}
                  >
                    {POST_ACCESS.map((access) => (
                      <option key={access} value={access}>
                        {access}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-lg-8 text-sm-end">
                  <button
                    type="submit"
                    className="btn btn-success"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? <Spinner /> : "Save"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
