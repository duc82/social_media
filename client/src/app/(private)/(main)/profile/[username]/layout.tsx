import { getFriend, getUserProfile } from "@/app/actions/userAction";
import ProfileMainHeader from "@/app/components/Profile/Main/Header";
import ProfileSidebar from "@/app/components/Profile/Sidebar";
import getServerSession from "@/app/libs/session";
import userService from "@/app/services/userService";
import { notFound } from "next/navigation";
import { ReactNode } from "react";

export default async function ProfileLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ username: string }>;
}) {
  const { currentUser, token } = await getServerSession();
  let { username } = await params;

  //  %40 is @
  if (!username.includes("%40")) {
    notFound();
  }

  username = username.replace(/%40/g, "");

  const [user, { total: totalFriends }] = await Promise.all([
    getUserProfile(username, currentUser, token),
    userService.getFriends("accepted", token),
  ]);

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
