import { getUserProfile } from "@/app/actions/userAction";
import ProfileInfo from "@/app/components/Profile/About/ProfileInfo";
import getServerSession from "@/app/libs/session";

export default async function About({
  params,
}: {
  params: { username?: string };
}) {
  const { currentUser, token } = await getServerSession();

  const username = params.username?.replace("%40", "");

  const user = await getUserProfile(username, currentUser, token);

  const isMyProfile = currentUser.id === user.id;

  return (
    <div className="card">
      <div className="card-header border-0 pb-0">
        <h5 className="card-title">Profile Info</h5>
      </div>

      <div className="card-body">
        <ProfileInfo user={user} isMyProfile={isMyProfile} />
      </div>
    </div>
  );
}