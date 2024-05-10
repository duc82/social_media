import { getFriendship, getUserById } from "@/app/actions/userAction";
import ProfileMainHeader from "@/app/components/Profile/Main/Header";
import ProfileSidebar from "@/app/components/Profile/Sidebar";
import getServerSession from "@/app/libs/session";
import userService from "@/app/services/userService";

export default async function ProfileLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id?: string };
}) {
  const { currentUser, accessToken } = await getServerSession();
  const user = await getUserById(params.id, currentUser);

  const { total: totalFriends } = await userService.getFriends(
    accessToken,
    "accepted"
  );

  const friendship = await getFriendship(accessToken, user.id);

  return (
    <div className="row g-4">
      <div className="col-lg-8 vstack gap-4">
        <ProfileMainHeader
          initialFriendship={friendship}
          user={user}
          currentUser={currentUser}
          initialTotalFriends={totalFriends}
        />
        {children}
      </div>
      <ProfileSidebar user={user} />
    </div>
  );
}
