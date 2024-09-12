"use client";
import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Avatar from "../Avatar";
import {
  Bookmark,
  ChatFill,
  Envelope,
  Flag,
  Pencil,
  ReplyFill,
  SendFill,
  ThreeDots,
  XCircle,
  Link as LinkIcon,
  Share,
  PencilSquare,
  HandThumbsUpFill,
} from "react-bootstrap-icons";
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

export default function PostItem({
  post,
  currentUser,
}: {
  post: Post;
  currentUser: FullUser;
}) {
  const { data: session } = useSession();
  const { updatePost, setPosts } = usePostContext();
  const token = session?.token;
  const [comments, setComments] = useState<Comment[]>([]);
  const [totalComments, setTotalComments] = useState(0);
  const [pageComments, setPageComments] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleLike = async () => {
    if (!token) return;
    const { post: newPost } = await postService.like(post.id, token);
    setPosts((prev) => {
      const idx = prev.findIndex((p) => p.id === post.id);
      if (idx !== -1) {
        prev[idx] = newPost;
      }
      return [...prev];
    });
  };

  const sendComment = async (content: string) => {
    if (!token) return;
    const { comment } = await postService.comment(post.id, content, token);
    setComments((prev) => [comment, ...prev]);
    setTotalComments((prev) => prev + 1);
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
    });
    setComments((prev) => [...prev, ...comments]);
    setPageComments(nextPage);
  };

  const handleRemove = async (id: string) => {
    if (!token) return;
    await postService.remove(id, token);
    setPosts((prev) => prev.filter((post) => post.id !== id));
  };

  useEffect(() => {
    const fetchComments = async () => {
      if (!token) return;
      const { comments, total } = await postService.getComments(post.id, token);
      setComments(comments);
      setTotalComments(total);
    };

    fetchComments();
  }, [post.id, token]);

  useEffect(() => {
    if (!token) return;
    const fetchHasLiked = async () => {
      const { liked } = await postService.hasLiked(post.id, token);
      setIsLiked(liked);
      console.log("render liked");
    };

    fetchHasLiked();
  }, [token, post.id]);

  const fullName = formatName(post.user.firstName, post.user.lastName);

  return (
    <div className="card">
      <div className="card-header border-0 pb-0">
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <Link
              href={`/profile/@${post.user.username}`}
              className="me-2 avatar avatar-story"
            >
              <Avatar
                src={post.user.profile.avatar}
                alt={fullName}
                fill={false}
                width={0}
                height={0}
                sizes="100vw"
                className="rounded-circle w-100 h-auto"
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
              <ThreeDots />
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <button
                  type="button"
                  className="dropdown-item"
                  data-bs-toggle="modal"
                  data-bs-target="#editPostModal"
                  onClick={() => updatePost(post)}
                >
                  <Pencil className="fa-fw pe-2" />
                  Edit post
                </button>
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
              {/* <li>
                <hr className="dropdown-divider" />
              </li> */}
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
        {post.content && (
          <p className={clsx("text-black", post.files.length === 0 && "mb-0")}>
            {post.content}
          </p>
        )}
        {post.files.length > 0 && post.files[0].type === "image" && (
          <div className="d-flex">
            <Fancybox className="row g-3">
              {post.files.map((file, index) => (
                <div
                  className={clsx(
                    post.files.length % 2 === 0 &&
                      post.files.length < 5 &&
                      "col-6",
                    post.files.length === 1 && "col-12",
                    post.files.length === 3 &&
                      (index === 0 ? "col-12" : "col-6"),
                    post.files.length >= 5 && (index > 1 ? "col-4" : "col-6")
                  )}
                  key={file.id}
                >
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
                </div>
              ))}
            </Fancybox>
          </div>
        )}

        <ul className="nav nav-stack py-3 small">
          <li className="nav-item">
            <button
              type="button"
              onClick={handleLike}
              className={clsx(
                "nav-link fw-normal d-flex align-items-start",
                isLiked && "active"
              )}
            >
              <HandThumbsUpFill className="pe-1" size={18} />
              {isLiked ? "Liked" : "Like"} ({post.likeCount})
            </button>
          </li>
          <li className="nav-item">
            <button
              type="button"
              className="nav-link fw-normal d-flex align-items-start"
              onClick={() => textareaRef.current?.focus()}
            >
              <ChatFill className="pe-1" size={18} />
              Comments ({totalComments})
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
                  <Envelope className="pe-2 fs-4" />
                  Send via Direct Message
                </Link>
              </li>
              <li>
                <Link href="#" className="dropdown-item">
                  <Bookmark className="fs-4 pe-2" />
                  Bookmark{" "}
                </Link>
              </li>
              <li>
                <Link href="#" className="dropdown-item">
                  <LinkIcon className="fs-4 pe-2" />
                  Copy link href post
                </Link>
              </li>
              <li>
                <Link href="#" className="dropdown-item">
                  <Share className="fs-4 pe-2" />
                  Share post via …
                </Link>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <Link href="#" className="dropdown-item">
                  <PencilSquare className="fs-4 pe-2" />
                  Share href News Feed
                </Link>
              </li>
            </ul>
          </li>
        </ul>

        <div className="d-flex mb-3">
          <Link
            href={`/profile/@${post.user.username}`}
            className="me-2 avatar avatar-xs"
          >
            <Avatar
              className="rounded-circle"
              src={post.user.profile.avatar}
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
              <SendFill />
            </button>
          </form>
        </div>

        {/* Comments */}
        <ul className="list-unstyled mb-0">
          {comments.map((comment) => (
            <PostComment
              comment={comment}
              key={comment.id}
              currentUser={currentUser}
              setComments={setComments}
            />
          ))}
        </ul>
      </div>

      {comments.length < totalComments && (
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
