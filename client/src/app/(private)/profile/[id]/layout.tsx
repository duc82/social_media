import friendAction from "@/app/actions/friendAction";
import profileAction from "@/app/actions/profileAction";
import userAction from "@/app/actions/userAction";
import ProfileMainHeader from "@/app/components/Profile/Main/Header";
import ProfileSidebar from "@/app/components/Profile/Sidebar";
import FriendProvider from "@/app/providers/FriendProvider";
import userService from "@/app/services/userService";

export default async function ProfileLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { id?: string };
}) {
  const session = await userAction.getServerSession();
  const accessToken = session?.accessToken as string;
  const currentUser = await userAction.getCurrentUser(session);
  const user = await profileAction.getById(params.id, currentUser);

  const {
    friends,
    total: totalFriends,
    page,
    limit
  } = await userService.getFriends(user.id, "accepted");

  const friendship = await friendAction.getFriendship(accessToken, user.id);

  return (
    <div className="row g-4">
      <div className="col-lg-8 vstack gap-4">
        <FriendProvider
          friends={friends}
          limit={limit}
          page={page}
          total={totalFriends}
        >
          <ProfileMainHeader
            initialFriendship={friendship}
            user={user}
            currentUser={currentUser}
          />
          {children}
        </FriendProvider>
      </div>
      {/* <ProfileSidebar user={user} /> */}
    </div>
  );
}
