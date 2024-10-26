"use client";
import { FormEvent, KeyboardEvent, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Avatar from "../Avatar";
import { formatDate, formatDateTime } from "@/app/utils/dateTime";
import { Comment, Post } from "@/app/types/post";
import formatName from "@/app/utils/formatName";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEarthAmerica,
  faLock,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import postService from "@/app/services/postService";
import { useSession } from "next-auth/react";
import clsx from "clsx";
import { FullUser } from "@/app/types/user";
import SpinnerDots from "../SpinnerDots";
import usePostContext from "@/app/hooks/usePostContext";
import Fancybox from "@/app/libs/FancyBox";
import PostComment from "./PostComment";
import VideoPlayer from "@/app/libs/VideoPlayer";

export default function PostItem({
  post,
  currentUser,
}: {
  post: Post;
  currentUser: FullUser;
}) {
  const { data: session } = useSession();
  const token = session?.token;
  const { updatePost, setPosts } = usePostContext();
  const [comments, setComments] = useState<Comment[]>(post.comments);
  const [pageComments, setPageComments] = useState<number>(1);
  const [limitComments, setLimitComments] = useState<number>(3);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleLike = async () => {
    if (!token) return;
    await postService.like(post.id, token);
    setPosts((prev) => {
      const idx = prev.findIndex((p) => p.id === post.id);
      if (idx !== -1) {
        prev[idx].likes.push(currentUser.id);
      }
      return [...prev];
    });
  };

  const handleUnlike = async () => {
    if (!token) return;
    await postService.unlike(post.id, token);
    setPosts((prev) => {
      const idx = prev.findIndex((p) => p.id === post.id);
      if (idx !== -1) {
        prev[idx].likes = prev[idx].likes.filter((id) => id !== currentUser.id);
      }
      return [...prev];
    });
  };

  const sendComment = async (content: string) => {
    if (!token) return;
    const { comment } = await postService.comment(post.id, content, token);
    setComments((prev) => [comment, ...prev]);
    setLimitComments((prev) => prev + 1);
    textareaRef.current!.value = "";
  };

  const handleSendComment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const content = textareaRef.current?.value;
    if (!content) return;
    await sendComment(content);
  };

  const handleTextareaKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const content = e.currentTarget.value;
      if (content) {
        sendComment(content);
      }
    }
  };

  const fetchMoreComments = async () => {
    if (!token) return;
    const nextPage = pageComments + 1;
    const { comments } = await postService.getComments(post.id, token, {
      page: nextPage,
      limit: limitComments,
    });

    setComments((prev) => [...prev, ...comments]);
    setPageComments(nextPage);
  };

  const handleRemove = async (id: string) => {
    if (!token) return;
    await postService.remove(id, token);
    setPosts((prev) => prev.filter((post) => post.id !== id));
  };

  const fullName = formatName(post.user.firstName, post.user.lastName);

  const isLiked = useMemo(
    () => post.likes.includes(currentUser.id),
    [post, currentUser]
  );

  const postFiles = useMemo(() => post.files.slice(0, 5), [post]);

  const total = post.commentCount;

  return (
    <div className="card">
      <div className="card-header border-0 pb-0">
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <Link
              href={`/profile/@${post.user.username}`}
              className="avatar avatar-story me-2"
            >
              <Avatar
                src={
                  post.user.id === currentUser.id
                    ? currentUser.profile.avatar
                    : post.user.profile.avatar
                }
                fill={false}
                width={0}
                height={0}
                alt={fullName}
                className="rounded-circle"
              />
            </Link>

            <div className="d-flex flex-column">
              <div>
                <Link
                  href={`/profile/@${post.user.username}`}
                  className="mb-0 h6"
                >
                  {fullName}
                </Link>

                {post.feeling && post.feeling.length > 0 && (
                  <span>
                    {" "}
                    is {post.feeling[0]} feeling {post.feeling[1]}
                  </span>
                )}
              </div>

              <div className="d-flex align-items-center">
                <p
                  className="mb-0 small me-2"
                  title={formatDate(post.createdAt, {
                    dateStyle: "full",
                    timeStyle: "short",
                  })}
                  suppressHydrationWarning
                >
                  {formatDateTime(post.createdAt)}
                </p>
                <div title={post.access}>
                  {post.access === "Public" && (
                    <FontAwesomeIcon icon={faEarthAmerica} size="xs" />
                  )}
                  {post.access === "Friends" && (
                    <FontAwesomeIcon icon={faUserGroup} size="xs" />
                  )}
                  {post.access === "Only me" && (
                    <FontAwesomeIcon icon={faLock} size="xs" />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="dropdown">
            <button
              type="button"
              className="text-secondary btn btn-secondary-soft-hover py-1 px-2 border-0"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="bi bi-three-dots"></i>
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              {post.user.id === currentUser.id && (
                <li>
                  <button
                    type="button"
                    className="dropdown-item"
                    data-bs-toggle="modal"
                    data-bs-target="#editPostModal"
                    onClick={() => updatePost(post)}
                  >
                    <i className="bi bi-pencil pe-2"></i>
                    Edit post
                  </button>
                </li>
              )}
              {post.user.id === currentUser.id && (
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => handleRemove(post.id)}
                  >
                    <i className="bi bi-x-circle pe-2"></i>
                    Remove post
                  </button>
                </li>
              )}
              {/* <li>
                <hr className="dropdown-divider" />
              </li> */}
              {post.user.id !== currentUser.id && (
                <li>
                  <button type="button" className="dropdown-item">
                    <i className="bi bi-flag pe-2"></i>
                    Report post
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
      <div className="card-body">
        {post.content && (
          <p className={clsx(post.files.length === 0 && "mb-0")}>
            {post.content}
          </p>
        )}
        {post.files.length > 0 && (
          <Fancybox className="row g-3">
            {postFiles.map((file, index) => (
              <div
                className={clsx(
                  post.files.length % 2 === 0 &&
                    post.files.length < 5 &&
                    "col-6",
                  post.files.length === 1 && "col-12",
                  post.files.length === 3 && (index === 0 ? "col-12" : "col-6"),
                  post.files.length >= 5 && (index > 1 ? "col-4" : "col-6")
                )}
                key={file.id}
              >
                <div className="position-relative">
                  {file.type === "image" && (
                    <Link href={file.url} data-fancybox>
                      <Image
                        src={file.url}
                        alt={post.id}
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="card-img object-fit-cover"
                        style={{ height: 300 }}
                      />
                    </Link>
                  )}
                  {file.type === "video" && <VideoPlayer src={file.url} />}

                  {index === postFiles.length - 1 && post.files.length > 5 && (
                    <div className="w-100 h-100 position-absolute top-0 start-0 d-flex align-items-center justify-content-center bg-black bg-opacity-25">
                      <span className="text-white fs-2 font-semibold">
                        +{post.files.length - postFiles.length}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </Fancybox>
        )}

        <ul className="nav nav-stack py-3 small">
          <li className="nav-item">
            <button
              type="button"
              onClick={isLiked ? handleUnlike : handleLike}
              className={clsx(
                "nav-link fw-normal d-flex align-items-start",
                isLiked && "active"
              )}
            >
              <i className="bi bi-hand-thumbs-up-fill pe-1"></i>
              {isLiked ? "Liked" : "Like"} ({post.likes.length})
            </button>
          </li>
          <li className="nav-item">
            <button
              type="button"
              className="nav-link fw-normal d-flex align-items-start"
              onClick={() => textareaRef.current?.focus()}
            >
              <i className="bi bi-chat-fill pe-1"></i>
              Comments ({post.totalComment})
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
              <i className="bi bi-reply-fill flip-horizontal ps-1"></i>
              Share (3)
            </button>
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="cardShareAction8"
            >
              <li>
                <Link href="#" className="dropdown-item">
                  <i className="bi bi-envelope pe-2 fs-4"></i>
                  Send via Direct Message
                </Link>
              </li>
              <li>
                <Link href="#" className="dropdown-item">
                  <i className="bi bi-bookmark fs-4 pe-2"></i>
                  Bookmark{" "}
                </Link>
              </li>
              <li>
                <Link href="#" className="dropdown-item">
                  <i className="bi bi-link-icon fs-4 pe-2"></i>
                  Copy link href post
                </Link>
              </li>
              <li>
                <Link href="#" className="dropdown-item">
                  <i className="bi bi-share fs-4 pe-2"></i>
                  Share post via …
                </Link>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <Link href="#" className="dropdown-item">
                  <i className="bi bi-pencil-square fs-4 pe-2"></i>
                  Share href News Feed
                </Link>
              </li>
            </ul>
          </li>
        </ul>

        <div className="d-flex">
          <Link
            href={`/profile/@${currentUser.username}`}
            className="me-2 avatar avatar-xs"
          >
            <Avatar
              className="rounded-circle"
              src={currentUser.profile.avatar}
              alt={fullName}
            />
          </Link>
          <form
            className="nav position-relative w-100"
            onSubmit={handleSendComment}
          >
            <label htmlFor="content" className="visually-hidden">
              Content
            </label>
            <textarea
              className="form-control pe-5 bg-light"
              rows={1}
              placeholder="Add a comment..."
              id="content"
              name="content"
              spellCheck={false}
              ref={textareaRef}
              onInput={(e) => {
                e.currentTarget.style.height = "0px";
                e.currentTarget.style.height =
                  e.currentTarget.scrollHeight + "px";
              }}
              onKeyDown={handleTextareaKeyDown}
              style={{ resize: "none", overflow: "hidden" }}
            />
            <button
              type="submit"
              title="Send"
              className="nav-link bg-transparent px-3 position-absolute top-50 end-0 translate-middle-y border-0"
            >
              <i className="bi bi-send-fill"></i>
            </button>
          </form>
        </div>

        {comments.length > 0 && (
          <div className="mt-3">
            {comments.map((comment) => (
              <PostComment
                comment={comment}
                key={comment.id}
                currentUser={currentUser}
                setComments={setComments}
              />
            ))}
          </div>
        )}
      </div>

      {comments.length < total && (
        <div className="card-footer border-0 pt-0">
          <button
            type="button"
            className="btn btn-link btn-sm p-0 text-secondary d-flex align-items-center"
            onClick={fetchMoreComments}
          >
            <SpinnerDots className="me-2" />
            Load more comments
          </button>
        </div>
      )}
    </div>
  );
}
