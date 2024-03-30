import { notFound } from "next/navigation";
import { FullUser } from "../types/user";
import userService from "../services/userService";

const profileAction = {
  async getById(
    id: string | undefined,
    currentUser: FullUser
  ): Promise<FullUser> {
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
  },
};

export default profileAction;
