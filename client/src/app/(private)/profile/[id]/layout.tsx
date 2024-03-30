import friendAction from "@/app/actions/friendAction";
import profileAction from "@/app/actions/profileAction";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ProfileMainHeader from "@/app/components/Profile/Main/Header";
import ProfileSidebar from "@/app/components/Profile/Sidebar";
import FriendProvider from "@/app/providers/FriendProvider";
import userService from "@/app/services/userService";
import { FullUser } from "@/app/types/user";
import { getServerSession } from "next-auth";

export default async function ProfileLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id?: string };
}) {
  const session = await getServerSession(authOptions);
  const accessToken = session?.accessToken!;
  const currentUser = session?.user as FullUser;
  const user = await profileAction.getById(params.id, currentUser);

  const {
    friends,
    total: totalFriends,
    page,
    limit,
  } = await userService.getFriends(user.id, "accepted", {
    limit: 5,
  });

  const friendship = await friendAction.getFriendship(
    accessToken,
    user.id,
    "pending"
  );

  console.log(friendship);

  return (
    <FriendProvider
      friends={friends}
      total={totalFriends}
      page={page}
      limit={limit}
    >
      <div className="row g-4">
        <div className="col-lg-8 vstack gap-4">
          <ProfileMainHeader
            friendship={friendship}
            accessToken={accessToken}
            user={user}
            isMyProfile={currentUser.id === user.id}
            initialSentFriendRequest={Boolean(friendship)}
          />
          {children}
        </div>
        <ProfileSidebar user={user} />
      </div>
    </FriendProvider>
  );
}
