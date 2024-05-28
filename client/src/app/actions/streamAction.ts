"use server";
import { StreamClient } from "@stream-io/node-sdk";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY!;
const apiSecret = process.env.NEXT_PUBLIC_STREAM_API_SECRET!;

export const getStreamToken = async (userId: string) => {
  const client = new StreamClient(apiKey, apiSecret);
  return client.createToken(userId);
};
