import { PostResponse } from "../types/post";
import apiRequest from "./api";

const postService = {
  create: (formData: FormData, acessToken: string) => {
    return apiRequest<PostResponse>("/posts", "POST", formData, {
      headers: {
        Authorization: `Bearer ${acessToken}`,
        "Content-Type": "multipart/form-data",
      },
    });
  },
};

export default postService;
