import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";

const userAction = {
  getServerSession: async () => await getServerSession(authOptions),
  getCurrentUser: async function () {
    const session = await this.getServerSession();
    return session?.user!;
  },
};

export default userAction;
