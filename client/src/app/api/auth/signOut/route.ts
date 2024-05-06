import { NextResponse } from "next/server";
import { signOut } from "../[...nextauth]/auth";

export const GET = async () => {
  await signOut();

  return NextResponse.json(
    {
      message: "Signed out"
    },
    {
      status: 200
    }
  );
};
