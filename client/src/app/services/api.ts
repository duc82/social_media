export type Method = "GET" | "POST" | "PUT" | "DELETE";

const API_BASE_URL: string | undefined = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error(
    "Please define the NEXT_PUBLIC_API_BASE_URL environment variable inside .env.local"
  );
}

export default async function apiRequest<T>(
  endpoint: string,
  method: Method = "GET",
  body: any = null,
  init: RequestInit = {}
): Promise<T> {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      method,
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : null,
      ...init,
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Something went wrong!");
    }

    return data;
  } catch (error) {
    throw error;
  }
}
