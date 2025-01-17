import BlockedList from "@/app/components/Settings/BlockedList";
import getServerSession from "@/app/libs/session";
import userService from "@/app/services/userService";

export default async function Blocking() {
  const { token } = await getServerSession();
  const { blocked, total } = await userService.getBlocked(token);

  return (
    <div className="card">
      <div className="card-header border-0 pb-0">
        <h5 className="card-title">Block users</h5>
        <p className="mb-0">
          List of users you have blocked. You can unblock them at any time.
        </p>
      </div>
      <BlockedList
        initialBlocked={blocked}
        initialTotal={total}
        token={token}
      />
    </div>
  );
}
