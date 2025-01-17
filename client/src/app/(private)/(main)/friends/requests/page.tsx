import getServerSession from "@/app/libs/session";
import userService from "@/app/services/userService";
import FriendRequests from "@/app/components/Friends/Requests";

export default async function Request() {
  const { token } = await getServerSession();

  const { friends, limit, page, total } = await userService.getFriendRequests(
    token,
    {
      page: 1,
      limit: 20,
    }
  );

  if (total === 0)
    return (
      <div className="row">
        <p>No friend requests</p>
      </div>
    );

  return (
    <FriendRequests initialFriends={friends} initialPage={page} limit={limit} />
  );
}
