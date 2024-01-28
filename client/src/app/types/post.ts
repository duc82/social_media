import { z } from "zod";
import { postSchema } from "../schemas/post";

interface File {
  id: string;
  url: string;
  type: "image" | "video";
  postId: string;
  createdAt: string;
}

interface Post {
  id: string;
  content: string;
  files: File[];
  userId: string;
  audience: "public" | "friends" | "private";
  createdAt: string;
}

interface PostResponse {
  message: string;
  post: Post;
}

interface PostDto extends z.infer<typeof postSchema> {
  preview: string;
}

export type { Post, File, PostDto, PostResponse };
