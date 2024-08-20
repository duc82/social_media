import getServerSession from "@/app/libs/session";
import userService from "@/app/services/userService";
import SuggestionFriends from "@/app/components/Friends/Suggestions";

export default async function Suggestions() {
  const { token } = await getServerSession();

  const { friends, limit, page } = await userService.getSuggestedFriends(
    token,
    {
      page: 1,
      limit: 20,
    }
  );

  return (
    <SuggestionFriends
      initialFriends={friends}
      limit={limit}
      initialPage={page}
      token={token}
    />
  );
}
