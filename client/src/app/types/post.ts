import { z } from "zod";
import { POST_ACCESS, postSchema } from "../schemas/post";
import { FullUser } from "./user";

type PostAccess = (typeof POST_ACCESS)[number];

export interface File {
  id: string;
  url: string;
  type: "image" | "video";
  createdAt: string;
}

export interface Comment {
  id: string;
  content: string;
  user: FullUser;
  post: Post;
  likes: FullUser[];
  replyCount: number;
  createdAt: string;
}

export interface Post {
  id: string;
  content?: string;
  files: File[];
  user: FullUser;
  likes: string[];
  comments: Comment[];
  totalComment: number;
  access: PostAccess;
  feeling: string[] | null;
  activity: string[] | null;
  deletedAt: string | null;
  createdAt: string;
}

export interface Feeling {
  name: string;
  emoji: string;
}

export interface Activity extends Feeling {
  action: string;
}

export interface PostResponse {
  message: string;
  post: Post;
}

export interface CommentResponse {
  message: string;
  comment: Comment;
}

export type FileUpload = Pick<File, "url" | "type">;

export type PostDto = z.infer<typeof postSchema>;

export interface PostsReponse {
  posts: Post[];
  total: number;
  limit: number;
  page: number;
}

export interface CommentsResponse {
  comments: Comment[];
  total: number;
  limit: number;
  page: number;
}
