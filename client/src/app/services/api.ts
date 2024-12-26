type Method = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

/* global RequestInit */
interface Options extends RequestInit {
  method?: Method;
  isFormData?: boolean;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error(
    "NEXT_PUBLIC_API_URL must be defined. Please add it to .env file."
  );
}

export default async function apiRequest<T>(
  endpoint: string,
  options?: Options
): Promise<T> {
  let headers = options?.headers || {};

  if (!options?.isFormData) {
    headers = {
      ...headers,
      "Content-Type": "application/json",
    };
  }

  const res = await fetch(`${API_URL}/api${endpoint}`, {
    ...options,
    headers,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Something went wrong. Please try again.");
  }

  return data;
}
