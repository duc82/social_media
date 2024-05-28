"use client";
import Avatar from "@/app/components/Avatar";
import useFriends from "@/app/hooks/useFriends";
import Link from "next/link";

export default function Friends() {
  const { friends } = useFriends();

  return (
    <div className="card">
      <div className="card-header pb-0">
        <h5 className="card-title">Friends</h5>
      </div>

      <div className="card-body">
        {friends.length > 0 ? (
          <>
            {friends.map((friend) => (
              <div
                key={friend.id}
                className="d-md-flex align-items-center mb-4"
              >
                <Link
                  href={`/profile/${friend.id}`}
                  className="avatar me-3 mb-3 mb-md-0"
                >
                  <Avatar
                    className="avatar-img rounded-circle"
                    src={friend.profile.avatar}
                    alt={friend.fullName}
                  />
                </Link>

                <div className="w-100">
                  <div className="d-sm-flex align-items-start">
                    <Link href={`/profile/${friend.id}`} className="h6 mb-0">
                      {friend.fullName}
                    </Link>

                    {friend.profile.job && (
                      <p className="small ms-sm-2 mb-0">{friend.profile.job}</p>
                    )}
                  </div>

                  <ul className="avatar-group mt-1 list-unstyled align-items-sm-center mb-0">
                    <li className="small">
                      Samuel Bishop, Judy Nguyen, and 115 other shared
                      connections
                    </li>
                  </ul>
                </div>

                <div className="ms-md-auto d-flex">
                  <button
                    type="button"
                    className="btn btn-danger-soft btn-sm mb-0 me-2"
                  >
                    Remove
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary-soft btn-sm mb-0"
                  >
                    Message
                  </button>
                </div>
              </div>
            ))}
            <div className="d-grid">
              <button
                type="button"
                className="btn btn-sm btn-loader btn-primary-soft"
                data-bs-toggle="button"
              >
                <span className="load-text"> Load more connections </span>
                {/* <div className="load-icon">
              <div className="spinner-grow spinner-grow-sm" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div> */}
              </button>
            </div>
          </>
        ) : (
          <p className="mb-0">
            You don&apos;t have any friends yet.{" "}
            <Link href="/friends/suggestions">Find new friends</Link>
          </p>
        )}
      </div>
    </div>
  );
}
