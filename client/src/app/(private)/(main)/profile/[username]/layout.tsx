import { getFriend, getUserProfile } from "@/app/actions/userAction";
import ProfileMainHeader from "@/app/components/Profile/Main/Header";
import ProfileSidebar from "@/app/components/Profile/Sidebar";
import getServerSession from "@/app/libs/session";
import userService from "@/app/services/userService";
import { ReactNode } from "react";

export default async function ProfileLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { username?: string };
}) {
  const { currentUser, token } = await getServerSession();
  const username = params.username?.replace("%40", ""); // %40 is @

  const user = await getUserProfile(username, currentUser, token);

  const { total: totalFriends } = await userService.getFriends(
    "accepted",
    token
  );

  const friend = await getFriend(user.id, token);

  return (
    <div className="row g-4">
      <div className="col-lg-8 vstack gap-4">
        <ProfileMainHeader
          initialFriend={friend}
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
