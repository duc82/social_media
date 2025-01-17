import { redirect } from "next/navigation";
import { auth } from "../api/auth/[...nextauth]/auth";

const getServerSession = async () => {
  const session = await auth();

  if (!session) {
    redirect("/signin");
  }

  const token = session.token;

  const currentUser = session.user;

  return {
    session,
    token,
    currentUser,
  };
};

export default getServerSession;
