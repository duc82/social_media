import { getUserProfile } from "@/app/actions/userAction";
import FriendList from "@/app/components/Profile/Friends/FriendList";
import getServerSession from "@/app/libs/session";
import userService from "@/app/services/userService";

export default async function Friends({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { currentUser, token } = await getServerSession();
  let { username } = await params;

  username = username.replace(/%40/g, "");

  const user = await getUserProfile(username, currentUser, token);

  const isMyProfile = currentUser.id === user.id;

  const { friends, total } = await userService.getFriends("accepted", token, {
    limit: 5,
    page: 1,
  });

  return (
    <div className="card">
      <div className="card-header pb-0">
        <h5 className="card-title">Friends</h5>
      </div>

      <div className="card-body">
        <FriendList
          initialFriends={friends}
          isLoadMore={friends.length < total}
        />
      </div>
    </div>
  );
}
