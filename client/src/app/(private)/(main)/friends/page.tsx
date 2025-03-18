import Suggestions from "@/app/components/Friends/Suggestions";
import getServerSession from "@/app/libs/session";
import userService from "@/app/services/userService";

const Friends = async () => {
  const { token } = await getServerSession();
  const { friends, limit, page } = await userService.getSuggestedFriends(
    token,
    {
      page: 1,
      limit: 20,
    }
  );

  return (
    <div>
      <h5 className="mb-3">People you may know</h5>
      <Suggestions
        initialFriends={friends}
        limit={limit}
        initialPage={page}
        token={token}
      />
    </div>
  );
};

export default Friends;
