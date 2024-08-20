import Link from "next/link";
import userService from "@/app/services/userService";
import getServerSession from "@/app/libs/session";
import Friend from "./Friend";

export default async function Friends() {
  const { token } = await getServerSession();
  const { friends, total } = await userService.getFriends("accepted", token, {
    page: 1,
    limit: 4,
  });

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
              <Friend key={friend.id} friend={friend} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
