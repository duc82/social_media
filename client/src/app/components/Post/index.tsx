"use client";
import Image from "next/image";
import Link from "next/link";
import Avatar from "../Avatar";
import {
  Bookmark,
  ChatFill,
  Flag,
  HandThumbsUpFill,
  PersonX,
  ReplyFill,
  SlashCircle,
  ThreeDots,
  XCircle,
} from "react-bootstrap-icons";
import { formatDateTime } from "@/app/utils/dateTime";
import { Post as IPost } from "@/app/types/post";
import formatName from "@/app/utils/formatName";
import clsx from "clsx";
import { useRef } from "react";

export default function Post({
  post,
  handleRemove,
  handleLike,
  isLiked,
}: {
  post: IPost;
  handleRemove: (_id: string) => Promise<void>;
  handleLike: (_id: string) => Promise<void>;
  isLiked: boolean;
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fullName = formatName(post.user.firstName, post.user.lastName);

  return (
    <div className="card">
      <div className="card-header border-0 pb-0">
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <Link href={`/profile/${post.user.username}`} className="me-2">
              <Avatar
                src={post.user.profile.avatar}
                alt={fullName}
                wrapperClassName="avatar-story"
                className="rounded-circle"
              />
            </Link>
            <div>
              <div className="nav nav-divider">
                <Link
                  href={`/profile/${post.user.username}`}
                  className="nav-item card- mb-0 h6"
                >
                  {fullName}
                </Link>
                <span
                  className="nav-item small"
                  title={new Date(post.createdAt).toLocaleString("en-US", {
                    dateStyle: "full",
                    timeStyle: "short",
                  })}
                >
                  {formatDateTime(post.createdAt)}
                </span>
              </div>
              <p className="mb-0 small">{post.user.profile.job}</p>
            </div>
          </div>
          <div className="dropdown">
            <button
              type="button"
              className="text-secondary btn btn-secondary-soft-hover py-1 px-2 border-0"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <ThreeDots />
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <Link className="dropdown-item" href="#">
                  <Bookmark className="fa-fw pe-2" />
                  Save post
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" href="#">
                  <PersonX className="fa-fw pe-2" />
                  Unfollow lori ferguson
                </Link>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleRemove(post.id)}
                >
                  <XCircle className="fa-fw pe-2" />
                  Remove post
                </button>
              </li>
              <li>
                <button type="button" className="dropdown-item">
                  <SlashCircle className="fa-fw pe-2" />
                  Block
                </button>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <button type="button" className="dropdown-item">
                  <Flag className="fa-fw pe-2" />
                  Report post
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="card-body">
        {post.content && <p className="mb-0 text-black">{post.content}</p>}
        {post.files.length > 0 && post.files[0].type === "image" && (
          <div className="row mt-2 g-2">
            {post.files.map((file) => (
              <div className="col-6 position-relative" key={file.id}>
                <Image
                  src={file.url}
                  alt={post.id}
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="card-img"
                  style={{ height: 300 }}
                  objectFit="cover"
                />
              </div>
            ))}
          </div>
        )}

        <ul className="nav nav-stack py-3 small">
          <li className="nav-item">
            <button
              type="button"
              onClick={() => handleLike(post.id)}
              className={clsx(
                "nav-link fw-normal d-flex align-items-start",
                isLiked && "active"
              )}
            >
              <HandThumbsUpFill className="pe-1" size={18} />
              {isLiked ? "Liked" : "Like"} ({post.likes.length})
            </button>
          </li>
          <li className="nav-item">
            <button
              type="button"
              className="nav-link fw-normal d-flex align-items-start"
              onClick={() => textareaRef.current?.focus()}
            >
              <ChatFill className="pe-1" size={18} />
              Comments (0)
            </button>
          </li>
          <li className="nav-item dropdown ms-sm-auto">
            <button
              type="button"
              className="nav-link mb-0 fw-normal d-flex align-items-start"
              id="cardShareAction8"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <ReplyFill className="flip-horizontal ps-1" size={18} />
              Share (3)
            </button>
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="cardShareAction8"
            >
              <li>
                <Link href="#" className="dropdown-item">
                  <i className="bi bi-envelope fa-fw pe-2"></i>
                  Send via Direct Message
                </Link>
              </li>
              <li>
                <Link href="#" className="dropdown-item">
                  <i className="bi bi-bookmark-check fa-fw pe-2"></i>Bookmark{" "}
                </Link>
              </li>
              <li>
                <Link href="#" className="dropdown-item">
                  <i className="bi bi-link fa-fw pe-2"></i>Copy link href post
                </Link>
              </li>
              <li>
                <Link href="#" className="dropdown-item">
                  <i className="bi bi-share fa-fw pe-2"></i>Share post via …
                </Link>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <Link href="#" className="dropdown-item">
                  <i className="bi bi-pencil-square fa-fw pe-2"></i>Share href
                  News Feed
                </Link>
              </li>
            </ul>
          </li>
        </ul>

        <div className="d-flex align-items-center mb-3">
          <Link href="#" className="me-2">
            <Avatar
              wrapperClassName="avatar-xs"
              className="rounded-circle"
              src={post.user.profile.avatar}
              alt={fullName}
            />
          </Link>
          <form className="position-relative w-100">
            <textarea
              className="form-control pe-4 bg-light"
              rows={1}
              placeholder="Add a comment..."
              ref={textareaRef}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
