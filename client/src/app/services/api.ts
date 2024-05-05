type Method = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

const API_URL: string | undefined = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error(
    "NEXT_PUBLIC_API_URL must be defined. Please add it to .env file."
  );
}

export default async function apiRequest<T>(
  endpoint: string,
  method: Method = "GET",
  init: RequestInit = {}
): Promise<T> {
  try {
    const res = await fetch(`${API_URL}/api${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...init.headers,
      },
      ...init,
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(
        data.message || "Something went wrong. Please try again."
      );
    }

    return data;
  } catch (error) {
    throw error;
  }
}
