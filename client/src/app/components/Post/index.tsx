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
import { Post } from "@/app/types/post";
import { formatDateTime } from "@/app/utils/dateTime";

export default function Post({
  post,
  handleDeletePost,
}: {
  post: Post;
  handleDeletePost: (id: string) => Promise<void>;
}) {
  return (
    <div className="card">
      <div className="card-header border-0 pb-0">
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <Link href="#!" className="avatar avatar-story me-2">
              <Avatar
                className="avatar-img rounded-circle"
                src={post.user.profile.avatar}
                alt={post.user.fullName}
              />
            </Link>
            <div>
              <div className="nav nav-divider">
                <Link href="#!" className="nav-item card- mb-0 h6">
                  {post.user.fullName}
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
              className="text-secondary btn btn-secondary-soft-hover py-1 px-2"
              id="cardFeedAction1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <ThreeDots />
            </button>
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="cardFeedAction1"
            >
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
                  onClick={() => handleDeletePost(post.id)}
                >
                  <XCircle className="fa-fw pe-2" />
                  Remove post
                </button>
              </li>
              <li>
                <Link className="dropdown-item" href="#">
                  <SlashCircle className="fa-fw pe-2" />
                  Block
                </Link>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <Link className="dropdown-item" href="#">
                  <Flag className="fa-fw pe-2" />
                  Report post
                </Link>
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
            <Link
              className="nav-link fw-normal d-flex align-items-start active"
              href="#!"
            >
              <HandThumbsUpFill className="pe-1" size={18} />
              Liked ({post.likes.length})
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link fw-normal d-flex align-items-start"
              href="#!"
            >
              <ChatFill className="pe-1" size={18} />
              Comments ({})
            </Link>
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
          <div className="avatar avatar-xs me-2">
            <Link href="#!">
              <Avatar
                className="avatar-img rounded-circle"
                src={post.user.profile.avatar}
                alt={post.user.fullName}
              />
            </Link>
          </div>
          <form className="position-relative w-100">
            <textarea
              className="form-control pe-4 bg-light"
              rows={1}
              placeholder="Add a comment..."
            />
          </form>
        </div>
      </div>
    </div>
  );
}
