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
  const currentUser = session?.user as FullUser;
  const user = await profileAction.getById(params.id, currentUser);

  const {
    friends,
    total: totalFriends,
    page,
    limit,
  } = await userService.getFriends(user.id, {
    limit: 5,
    status: "accepted",
  });

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
            user={user}
            isMyProfile={currentUser.id === user.id}
          />
          {children}
        </div>
        <ProfileSidebar user={user} />
      </div>
    </FriendProvider>
  );
}
