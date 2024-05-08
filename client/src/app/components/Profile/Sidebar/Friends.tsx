import Link from "next/link";
import Avatar from "../../Avatar";
import { ChatLeftText, PersonX } from "react-bootstrap-icons";
import userService from "@/app/services/userService";
import getServerSession from "@/app/libs/session";

export default async function Friends() {
  const { accessToken } = await getServerSession();
  const { friends, total } = await userService.getFriends(
    accessToken,
    "accepted",
    {
      page: 1,
      limit: 4
    }
  );

  if (total === 0) return null;

  return (
    <div className="col-md-6 col-lg-12">
      <div className="card">
        <div className="card-header d-sm-flex justify-content-between align-items-center border-0">
          <h5 className="card-title">
            Friends{" "}
            <span className="badge bg-danger bg-opacity-10 text-danger">
              {total}
            </span>
          </h5>
          <Link className="btn btn-primary-soft btn-sm" href="/friends/list">
            See all friends
          </Link>
        </div>

        <div className="card-body position-relative pt-0">
          <div className="row g-3">
            {friends.map((friend) => (
              <div key={friend.id} className="col-6">
                <div className="card shadow-none text-center h-100">
                  <div className="card-body p-2 pb-0">
                    <Link
                      href={`/profile/${friend.id}`}
                      className="avatar avatar-xl"
                    >
                      <Avatar
                        className="avatar-img rounded-circle"
                        src={friend.profile.avatar}
                        alt={friend.fullName}
                      />
                    </Link>
                    <h6 className="card-title mb-1 mt-3">
                      <Link href={`/profile/${friend.id}`}>
                        {friend.fullName}
                      </Link>
                    </h6>
                    <p className="mb-0 small lh-sm">16 mutual connections</p>
                  </div>
                  <div className="card-footer p-2 border-0">
                    <button
                      type="button"
                      className="btn btn-sm btn-primary me-1 me-lg-2"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      aria-label="Send message"
                      data-bs-original-title="Send message"
                    >
                      <ChatLeftText />
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-danger"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      aria-label="Remove friend"
                      data-bs-original-title="Remove friend"
                    >
                      <PersonX size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
