import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ProfileMainHeader from "@/app/components/Profile/Main/Header";
import ProfileSidebar from "@/app/components/Profile/Sidebar";
import FriendProvider from "@/app/providers/FriendProvider";
import userService from "@/app/services/userService";
import { FullUser } from "@/app/types/user";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

const getProfile = async (
  id: string | undefined,
  currentUser: FullUser
): Promise<FullUser> => {
  if (!id) {
    return currentUser;
  }

  if (currentUser.id === id) {
    return currentUser;
  }

  try {
    const user = await userService.getUserProfile(id);
    return user;
  } catch (error) {
    notFound();
  }
};

export default async function ProfileLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id?: string };
}) {
  const session = await getServerSession(authOptions);
  const currentUser = session?.user as FullUser;
  const user = await getProfile(params.id, currentUser);

  const {
    friends,
    total: totalFriends,
    page,
    limit,
  } = await userService.getFriends(user.id);

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
        <ProfileSidebar />
      </div>
    </FriendProvider>
  );
}
