import { z } from "zod";
import { postSchema } from "../schemas/post";
import { FullUser, User } from "./user";

export interface File {
  id: string;
  url: string;
  type: "image" | "video";
  postId: string;
  createdAt: string;
}

export interface Post {
  id: string;
  content?: string;
  files: File[];
  user: User;
  likes: FullUser[];
  comments: User[];
  access: "public" | "friends" | "private";
  deletedAt: string | null;
  createdAt: string;
}

export interface PostResponse {
  message: string;
  post: Post;
}

export interface FileUpload extends Pick<File, "url" | "type"> {}

export interface PostDto extends z.infer<typeof postSchema> {
  files: FileUpload[];
}

export interface PostsReponse {
  posts: Post[];
  total: number;
  limit: number;
  page: number;
}
