"use server";

import { notFound } from "next/navigation";
import getServerSession from "../libs/session";
import postService from "../services/postService";
import { Options } from "../types";

export const getPostById = async (postId: string) => {
  const { token } = await getServerSession();
  try {
    const post = await postService.getById(postId, token);
    return post;
  } catch (error) {
    notFound();
  }
};

export const getComments = async (postId: string, options?: Options) => {
  const { token } = await getServerSession();
  return postService.getComments(postId, token, options);
};
