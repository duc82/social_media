import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ProfileMainHeader from "@/app/components/Profile/Main/Header";
import ProfileSidebar from "@/app/components/Profile/Sidebar";
import userService from "@/app/services/userService";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

const getProfile = async (id: string) => {
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
  const user = await getProfile(params.id || session?.user.id!);

  return (
    <div className="row g-4">
      <div className="col-lg-8 vstack gap-4">
        <ProfileMainHeader
          user={user}
          isUserLoggedIn={session?.user.id === user.id}
        />
        {children}
      </div>
      <ProfileSidebar />
    </div>
  );
}
