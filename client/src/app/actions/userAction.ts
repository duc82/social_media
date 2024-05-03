import { Session, getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";

const userAction = {
  getServerSession: async () => await getServerSession(authOptions),
  getCurrentUser: async function (session?: Session | null) {
    if (session !== undefined) {
      return session?.user!;
    }

    const newSession = await this.getServerSession();
    return newSession?.user!;
  }
};

export default userAction;
