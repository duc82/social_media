import { redirect } from "next/navigation";
import { auth } from "../api/auth/[...nextauth]/auth";

const getServerSession = async () => {
  const session = await auth();

  if (!session) {
    redirect("/signin");
  }

  const accessToken = session?.accessToken!;

  const currentUser = session.user;

  return {
    session,
    accessToken,
    currentUser
  };
};

export default getServerSession;
