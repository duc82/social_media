import Link from "next/link";
import Avatar from "../Avatar";
import { Notification } from "@/app/types/notification";
import { formatDateTime } from "@/app/utils/dateTime";

export default function NotificationsDropdown({
  notifications,
}: {
  notifications: Notification[];
}) {
  return (
    <div
      className="dropdown-menu dropdown-menu-end shadow-lg border-0 p-0"
      style={{ minWidth: "22rem" }}
    >
      <div className="card">
        <div className="card-header d-flex align-items-center justify-content-between">
          <h6 className="m-0">
            Notifications
            <span className="badge text-danger bg-danger bg-opacity-10 ms-2">
              4 new
            </span>
          </h6>
          <a role="button" className="small">
            Clear all
          </a>
        </div>
        <div className="card-body p-0">
          <ul className="list-group list-group-flush p-2">
            {notifications.map((notification) => (
              <li key={notification.id}>
                <div className="list-group-item list-group-item-action rounded badge-unread d-flex border-0 mb-1 p-3">
                  <div className="avatar text-center d-none d-sm-inline-block">
                    <Avatar
                      className="rounded-circle"
                      src={notification.actor.profile.avatar}
                      alt="Avatar"
                    />
                  </div>
                  <div className="ms-sm-3">
                    <div className=" d-flex">
                      <p className="small mb-2">
                        <b>{notification.actor.fullName}</b>{" "}
                        {notification.content}.
                      </p>
                      <p className="small ms-3 text-nowrap">
                        {formatDateTime(notification.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            ))}

            <li>
              <div className="list-group-item list-group-item-action rounded badge-unread d-flex border-0 mb-1 p-3">
                <div className="avatar text-center d-none d-sm-inline-block">
                  <Avatar
                    className="rounded-circle"
                    src="/01.jpg"
                    alt="Avatar"
                  />
                </div>
                <div className="ms-sm-3">
                  <div className=" d-flex">
                    <p className="small mb-2">
                      <b>Judy Nguyen</b> sent you a friend request.
                    </p>
                    <p className="small ms-3 text-nowrap">Just now</p>
                  </div>
                  <div className="d-flex">
                    <button
                      type="button"
                      className="btn btn-sm py-1 btn-primary me-2"
                    >
                      Accept{" "}
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm py-1 btn-danger-soft"
                    >
                      Delete{" "}
                    </button>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className="card-footer text-center">
          <Link
            href="/notifications"
            title="See all notifications"
            className="btn btn-sm btn-primary-soft"
          >
            See all incoming activity
          </Link>
        </div>
      </div>
    </div>
  );
}
