import { Session } from "next-auth";
import { FullUser } from "../types/user";
import { auth } from "../api/auth/[...nextauth]/auth";

const userAction = {
  getServerSession: async () => await auth(),
  getCurrentUser: async function (session?: Session | null) {
    if (session !== undefined) {
      return session?.user! as FullUser;
    }

    const newSession = await this.getServerSession();
    return newSession?.user! as FullUser;
  },
};

export default userAction;
