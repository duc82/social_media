import { PostResponse } from "../types/post";

const postService = {
  create: async (formData: FormData, acessToken: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/create`,
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${acessToken}`,
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      return data as PostResponse;
    } catch (error) {
      throw error;
    }
  },
};

export default postService;
