import { z } from "zod";
import { postSchema } from "../schemas/post";
import { User } from "./user";

interface File {
  id: string;
  url: string;
  type: "image" | "video";
  postId: string;
  createdAt: string;
}

interface Post {
  id: string;
  content?: string;
  files: File[];
  user: User;
  likes: User[];
  comments: User[];
  audience: "public" | "friends" | "private";
  deleteAt: string | null;
  createdAt: string;
}

interface PostResponse {
  message: string;
  post: Post;
}

interface PostDto extends z.infer<typeof postSchema> {
  preview: string;
}

interface PostsReponse {
  posts: Post[];
  total: number;
  limit: number;
  page: number;
}

export type { Post, File, PostDto, PostResponse, PostsReponse };
