import { FullUser } from "./user";

export interface Story {
  id: string;
  content: string;
  type: "image" | "video";
  expiresAt: string;
  createdAt: string;
  user: FullUser;
}

export interface UserStory extends FullUser {
  stories: Story[];
}

export interface UserStoriesResponse {
  users: UserStory[];
  total: number;
  limit: number;
  skip: number;
}

export interface StoryResponse {
  story: Story;
  message: string;
}
