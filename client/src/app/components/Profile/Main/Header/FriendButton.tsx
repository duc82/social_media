"use client";
import clsx from "clsx";
import {
  PersonCheckFill,
  PersonPlusFill,
  PersonXFill,
} from "react-bootstrap-icons";

interface FriendButtonProps {
  isLoading?: boolean;
  status: "none" | "accepted" | "pending" | "cancel";
  className?: string;
}

const FriendButton = ({
  isLoading = false,
  status,
  className,
}: FriendButtonProps) => {
  const datas: Record<
    typeof status,
    {
      name: string;
      icon: JSX.Element;
      className: string;
    }
  > = {
    none: {
      name: "Add friend",
      icon: <PersonPlusFill width={16} height={16} />,
      className: "btn-primary",
    },
    accepted: {
      name: "Friends",
      icon: <PersonCheckFill width={16} height={16} />,
      className: "btn-success",
    },
    pending: {
      name: "Accept",
      icon: <PersonCheckFill width={16} height={16} />,
      className: "btn-success",
    },
    cancel: {
      name: "Cancel",
      icon: <PersonXFill width={16} height={16} />,
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
