"use client";
import { Comment } from "@/app/types/post";
import Link from "next/link";
import Avatar from "../Avatar";

import { formatDate, formatDateTime } from "@/app/utils/dateTime";
import {
  Dispatch,
  FormEvent,
  KeyboardEvent,
  SetStateAction,
  useRef,
  useState,
} from "react";
import { FullUser } from "@/app/types/user";
import postService from "@/app/services/postService";
import { useSession } from "next-auth/react";
import SpinnerDots from "../SpinnerDots";
import clsx from "clsx";

export default function PostComment({
  comment,
  currentUser,
  setComments,
  initialLimit = 3,
  paddingLeft = "0",
}: {
  comment: Comment;
  currentUser: FullUser;
  setComments: Dispatch<SetStateAction<Comment[]>>;
  initialLimit?: number;
  paddingLeft?: string;
}) {
  const [isReplying, setIsReplying] = useState<boolean>(false);
  const [isHaveSeenReplies, setIsHaveSeenReplies] = useState<boolean>(false);
  const [replies, setReplies] = useState<Comment[]>([]);
  const [totalReplies, setTotalReplies] = useState<number>(0);
  const [pageReplies, setPageReplies] = useState<number>(0);
  const [limitReplies, setLimitReplies] = useState<number>(initialLimit);
  const replyTextAreaRef = useRef<HTMLTextAreaElement>(null);
  const { data } = useSession();
  const token = data?.token;

  const handleLikeComment = async () => {
    if (!token) return;
    await postService.likeComment(comment.id, token);
    setComments((prev) =>
      prev.map((c) => {
        if (c.id === comment.id) {
          return {
            ...c,
            likes: [...c.likes, currentUser],
          };
        }
        return c;
      })
    );
  };

  const handleUnlikeComment = async () => {
    if (!token) return;
    await postService.unlikeComment(comment.id, token);
    setComments((prev) => {
      const idx = prev.findIndex((c) => c.id === comment.id);
      if (idx !== -1) {
        prev[idx].likes = prev[idx].likes.filter(
          (user) => user.id !== currentUser.id
        );
      }
      return [...prev];
    });
  };

  const handleReplyComment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const content = replyTextAreaRef.current?.value;
    if (!content) return;
    await replyComment(content);
  };

  const replyComment = async (content: string) => {
    if (!token) return;
    try {
      const { comment: newComment } = await postService.replyComment(
        comment.id,
        content,
        token
      );
      setReplies((prev) => [newComment, ...prev]);
      setTotalReplies((prev) => prev + 1);
      setLimitReplies((prev) => prev + 1);
      replyTextAreaRef.current!.value = "";
    } catch (error) {
      console.log(error);
    }
  };

  const handleTextareaKeyDown = async (
    e: KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const content = e.currentTarget.value;
      if (content) {
        await replyComment(content);
      }
    }
  };

  const getReplies = async () => {
    if (!token) return;

    const newPage = pageReplies + 1;

    const { comments, total, page } = await postService.getReplies(
      comment.id,
      token,
      {
        page: newPage,
        limit: limitReplies,
      }
    );
    setReplies((prev) => [...prev, ...comments]);
    setTotalReplies(total);
    setPageReplies(page);
    setIsHaveSeenReplies(true);
  };

  const isLiked = comment.likes.some((user) => user.id === currentUser.id);

  return (
    <div className="comment-item" key={comment.id} style={{ paddingLeft }}>
      <div className="d-flex">
        <Link
          href={`/profile/@${comment.user.username}`}
          className="avatar avatar-xs"
        >
          <Avatar
            src={
              comment.user.id === currentUser.id
                ? currentUser.profile.avatar
                : comment.user.profile.avatar
            }
            alt={comment.user.username}
            className="rounded-circle"
          />
        </Link>
        <div className="ms-2">
          <div className="bg-light rounded-start-top-0 p-3 rounded">
            <div className="d-flex justify-content-between">
              <h6 className="mb-1">
                <Link href={`/profile/@${comment.user.username}`}>
                  {comment.user.fullName}
                </Link>
              </h6>
              <small
                className="ms-2"
                title={formatDate(comment.createdAt, {
                  dateStyle: "full",
                  timeStyle: "short",
                })}
                suppressHydrationWarning
              >
                {formatDateTime(comment.createdAt)}
              </small>
            </div>
            <p className="small mb-0">{comment.content}</p>
          </div>
          <ul className="nav nav-divider py-2 small">
            <li className="nav-item">
              <button
                type="button"
                className={clsx("nav-link", isLiked && "active")}
                onClick={isLiked ? handleUnlikeComment : handleLikeComment}
              >
                {isLiked ? "Liked" : "Like"} ({comment.likes.length})
              </button>
            </li>
            <li className="nav-item">
              <button
                type="button"
                className="nav-link"
                onClick={() => setIsReplying((prev) => !prev)}
              >
                Reply
              </button>
            </li>
            {comment.replyCount > 0 && !isHaveSeenReplies && (
              <li className="nav-item">
                <button type="button" className="nav-link" onClick={getReplies}>
                  View {comment.replyCount} replies
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
      {replies.map((reply) => (
        <PostComment
          key={reply.id}
          comment={reply}
          currentUser={currentUser}
          setComments={setReplies}
          initialLimit={limitReplies}
          paddingLeft="calc(2.1875rem + .5rem)"
        />
      ))}

      {totalReplies > replies.length && (
        <button
          type="button"
          className="btn btn-link btn-sm text-secondary d-flex align-items-center"
          style={{ paddingLeft: "calc(2.1875rem + .5rem)" }}
          onClick={getReplies}
        >
          <SpinnerDots className="me-2" />
          Load more replies
        </button>
      )}

      {isReplying && (
        <div
          className="d-flex mb-3"
          style={{ paddingLeft: "calc(2.1875rem + .5rem)" }}
        >
          <Link
            href={`/profile/@${currentUser.username}`}
            className="me-2 avatar avatar-xxs"
          >
            <Avatar
              className="rounded-circle"
              src={currentUser.profile.avatar}
              alt={currentUser.fullName}
            />
          </Link>
          <form className="w-100" onSubmit={handleReplyComment}>
            <textarea
              className="form-control bg-light rounded-bottom-0 border-bottom-0"
              placeholder="Write a reply..."
              spellCheck="false"
              name="content"
              ref={replyTextAreaRef}
              rows={1}
              onKeyDown={handleTextareaKeyDown}
              onInput={(e) => {
                e.currentTarget.style.height = "0px";
                e.currentTarget.style.height =
                  e.currentTarget.scrollHeight + "px";
              }}
              style={{
                maxHeight: "500px",
                resize: "none",
              }}
            />
            <div className="py-2 px-3 bg-light d-flex align-items-center justify-content-between rounded-bottom-2 border border-top-0">
              <div></div>
              <button
                type="submit"
                className="nav-link bg-transparent px-3 border-0"
              >
                <i className="bi bi-send-fill"></i>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
