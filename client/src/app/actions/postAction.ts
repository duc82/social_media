"use server";

import getServerSession from "../libs/session";
import postService from "../services/postService";
import { Options } from "../types";

export const getComments = async (postId: string, options?: Options) => {
  const { token } = await getServerSession();
  return postService.getComments(postId, token, options);
};
