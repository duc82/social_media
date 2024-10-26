"use client";
import clsx from "clsx";
import { ReactNode } from "react";

interface FriendButtonProps {
  isLoading?: boolean;
  status: "accept" | "friends" | "cancel" | "decline" | "none";
  onClick: () => void;
  className?: string;
}

const FriendButton = ({
  isLoading = false,
  status,
  onClick,
  className,
}: FriendButtonProps) => {
  const datas: Record<
    typeof status,
    {
      name: string;
      icon: ReactNode;
      className: string;
    }
  > = {
    none: {
      name: "Add friend",
      icon: <i className="bi bi-person-plus-fill"></i>,
      className: "btn-primary",
    },
    friends: {
      name: "Friends",
      icon: <i className="bi bi-person-check-fill"></i>,
      className: "btn-primary",
    },
    accept: {
      name: "Accept",
      icon: <i className="bi bi-person-check-fill"></i>,
      className: "btn-success",
    },
    cancel: {
      name: "Cancel",
      icon: <i className="bi bi-person-x-fill"></i>,
      className: "btn-danger",
    },
    decline: {
      name: "Decline",
      icon: <i className="bi bi-person-x-fill"></i>,
      className: "btn-danger",
    },
  };

  return (
    <button
      type="button"
      className={clsx(
        "btn btn-primary d-flex align-items-center",
        datas[status].className,
        className
      )}
      onClick={onClick}
    >
      {isLoading ? (
        <div
          className="spinner-border spinner-border-sm text-white"
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        datas[status].icon
      )}
      <span className="ms-2">{datas[status].name}</span>
    </button>
  );
};

export default FriendButton;
