"use client";

import { FileUpload, PostDto } from "@/app/types/post";
import { useForm } from "react-hook-form";
import Avatar from "../../Avatar";
import {
  Calendar2EventFill,
  EmojiSmileFill,
  GeoAltFill,
  ImageFill,
  TagFill,
  XLg,
} from "react-bootstrap-icons";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import postService from "@/app/services/postService";
import handlingError from "@/app/utils/error";
import useBootstrapContext from "@/app/hooks/useBootstrapContext";
import { FilePreview } from "@/app/types";
import Dropzone from "./Dropzone";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { FullUser } from "@/app/types/user";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSchema } from "@/app/schemas/post";
import formatName from "@/app/utils/formatName";
import { revalidateTag } from "@/app/actions/indexAction";
import { uploadFile } from "@/app/libs/firebase";
import Spinner from "../../Spinner";
import TagPeopleModal from "./TagPeopleModal";

interface PostForm extends Omit<PostDto, "files"> {}

export default function CreatePostModal({
  initialActiveDropzone = false,
  currentUser,
}: {
  initialActiveDropzone?: boolean;
  currentUser: FullUser;
}) {
  const [isActiveDropzone, setActiveDropzone] = useState(initialActiveDropzone);
  const [feeling, setFeeling] = useState("");
  const [files, setFiles] = useState<FilePreview[]>([]);
  const { data: session } = useSession();
  const token = session?.token!;

  const modalRef = useRef<HTMLDivElement>(null);
  const bootstrap = useBootstrapContext();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting },
  } = useForm<PostForm>({
    resolver: zodResolver(postSchema),
  });

  const content = watch("content");

  const clearFiles = () => {
    setFiles([]);
    setActiveDropzone(false);
  };

  const closeModal = () => {
    setFiles([]);
    setActiveDropzone(false);
    reset();
    if (modalRef.current && bootstrap) {
      bootstrap.Modal.getOrCreateInstance(modalRef.current).hide();
    }
  };

  const onSubmit = async (data: PostForm) => {
    if (!data.content && !files.length) {
      toast.error("Please fill all fields");
      return;
    }

    const body = {
      ...data,
      files: [] as FileUpload[],
    };

    try {
      for (const file of files) {
        const downloadURL = await uploadFile(`posts/${file.name}`, file);
        body.files.push({
          url: downloadURL,
          type: file.type.includes("image") ? "image" : "video",
        });
      }

      await postService.create(body, token);
      revalidateTag("postProfile");
      closeModal();
    } catch (error) {
      toast.error(handlingError(error));
    }
  };

  const filePreviews = files.slice(0, 5);

  const fullName = formatName(currentUser.firstName, currentUser.lastName);

  return (
    <>
      <TagPeopleModal />
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <div
                className="modal-body overflow-y-auto"
                style={{ maxHeight: 400 }}
              >
                <div className="d-flex align-items-center mb-3">
                  <Avatar
                    wrapperClassName="avatar avatar-xs me-2"
                    className="avatar-img rounded-circle"
                    src={currentUser.profile.avatar}
                    alt={fullName}
                  />

                  <span className="fw-semibold text-gray-700">
                    {fullName}{" "}
                    {/* {feeling && (
                    <span>
                      is {feeling.emoji} feeling {feeling.meaning}
                    </span>
                  )} */}
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
                          files.length % 2 === 0 && files.length < 5 && "col-6",
                          files.length === 1 && "col-12",
                          files.length === 3 &&
                            (index === 0 ? "col-12" : "col-6"),
                          files.length >= 5 && (index > 1 ? "col-4" : "col-6")
                        )}
                      >
                        <div className="card border-0">
                          <Image
                            src={file.preview}
                            alt={file.name}
                            width={0}
                            height={0}
                            sizes="100vw"
                            className="card-img object-fit-cover h-auto"
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
                      <XLg />
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
                    <ImageFill />
                  </button>
                  <button
                    className="icon-md bg-danger bg-opacity-10 text-danger rounded-circle border-0"
                    type="button"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    data-bs-trigger="hover"
                    data-bs-title="Events"
                  >
                    <Calendar2EventFill />
                  </button>
                  <button
                    type="button"
                    className="icon-md bg-warning bg-opacity-10 text-warning rounded-circle border-0"
                    data-bs-tooltip="true"
                    data-bs-placement="top"
                    data-bs-title="Feeling/Activity"
                    data-bs-trigger="hover"
                    data-bs-toggle="modal"
                    data-bs-target="#emojiModal"
                  >
                    <EmojiSmileFill />
                  </button>
                  <button
                    type="button"
                    className="icon-md bg-light text-secondary rounded-circle border-0"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    data-bs-trigger="hover"
                    data-bs-title="Check in"
                  >
                    <GeoAltFill />
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
                    <TagFill />
                  </button>
                </div>
              </div>

              <div className="modal-footer row justify-content-between">
                <div className="col-lg-3">
                  <select className="form-select" {...register("access")}>
                    <option value="public" defaultChecked>
                      Public
                    </option>
                    <option value="friends">Friends</option>
                    <option value="private">Private</option>
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
        </div>
      </div>
    </>
  );
}
