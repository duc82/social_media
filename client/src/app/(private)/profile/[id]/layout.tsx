import { getFriendship } from "@/app/actions/userAction";
import profileAction from "@/app/actions/profileAction";
import ProfileMainHeader from "@/app/components/Profile/Main/Header";
import ProfileSidebar from "@/app/components/Profile/Sidebar";
import getServerSession from "@/app/libs/session";
import FriendProvider from "@/app/providers/FriendProvider";
import userService from "@/app/services/userService";

export default async function ProfileLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id?: string };
}) {
  const { currentUser, accessToken } = await getServerSession();
  const user = await profileAction.getById(params.id, currentUser);

  const {
    friends,
    total: totalFriends,
    page,
    limit,
  } = await userService.getFriends(accessToken, "accepted");

  const friendship = await getFriendship(accessToken, user.id);

  return (
    <div className="row g-4">
      <div className="col-lg-8 vstack gap-4">
        <FriendProvider initialFriends={friends} initialFriendship={friendship}>
          <ProfileMainHeader
            initialFriendship={friendship}
            user={user}
            currentUser={currentUser}
          />
          {children}
        </FriendProvider>
      </div>
      <ProfileSidebar user={user} />
    </div>
  );
}
