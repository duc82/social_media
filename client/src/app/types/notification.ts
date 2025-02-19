import { Comment, Post } from "./post";
import { FullUser } from "./user";

export interface NotificationSettings {
  id: string;
  likes: boolean;
  followers: boolean;
  comments: boolean;
  friendRequests: boolean;
  birthdays: boolean;
  events: boolean;
  groups: boolean;
  messages: boolean;
}

export interface Notification {
  id: string;
  content: string;
  actor: FullUser;
  user: FullUser;
  post: Post;
  comment: Comment;
  readAt: string | null;
  createdAt: string;
}
