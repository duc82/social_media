"use client";
import { Comment } from "@/app/types/post";
import Link from "next/link";
import Avatar from "../Avatar";
import formatName from "@/app/utils/formatName";
import { formatDate, formatDateTime } from "@/app/utils/dateTime";
import { Dispatch, SetStateAction, useState } from "react";
import { FullUser } from "@/app/types/user";
import { SendFill } from "react-bootstrap-icons";
import postService from "@/app/services/postService";
import { useSession } from "next-auth/react";

export default function PostComment({
  comment,
  currentUser,
  setComments,
}: {
  comment: Comment;
  currentUser: FullUser;
  setComments: Dispatch<SetStateAction<Comment[]>>;
}) {
  const [isReplying, setIsReplying] = useState<boolean>(false);
  const { data } = useSession();
  const token = data?.token;

  const handleLikeComment = async () => {
    if (!token) return;
    const { comment: newComment } = await postService.likeComment(
      comment.id,
      token
    );
    setComments((prev) => {
      const index = prev.findIndex((c) => c.id === comment.id);
      if (index !== -1) {
        prev[index] = newComment;
      }
      return [...prev];
    });
  };

  const fullName = formatName(comment.user.firstName, comment.user.lastName);
  return (
    <li className="comment-item" key={comment.id}>
      <div className="d-flex">
        <Link
          href={`/profile/@${comment.user.username}`}
          className="avatar avatar-xs"
        >
          <Avatar
            src={comment.user.profile.avatar}
            alt={comment.user.username}
            className="rounded-circle"
          />
        </Link>
        <div className="ms-2">
          <div className="bg-light rounded-start-top-0 p-3 rounded">
            <div className="d-flex justify-content-between">
              <h6 className="mb-1">
                <Link href={`/profile/@${comment.user.username}`}>
                  {" "}
                  {fullName}
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
                className="nav-link"
                onClick={handleLikeComment}
              >
                Like ({comment.likeCount})
              </button>
            </li>
            <li className="nav-item">
              <button
                type="button"
                className="nav-link"
                onClick={() => setIsReplying(true)}
              >
                Reply
              </button>
            </li>
            {comment.replyCount > 0 && (
              <li className="nav-item">
                <button type="button" className="nav-link">
                  View {comment.replyCount} replies
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
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
              alt={fullName}
            />
          </Link>
          <form className="w-100">
            <textarea
              className="form-control bg-light rounded-bottom-0 border-bottom-0"
              placeholder="Write a reply..."
              spellCheck="false"
              rows={1}
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
                <SendFill />
              </button>
            </div>
          </form>
        </div>
      )}
    </li>
  );
}
