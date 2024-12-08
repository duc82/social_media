import RingingCall from "@/app/components/RingingCall";
import RingingCallSpinner from "@/app/components/RingingCall/RingingCallSpinner";
import getServerSession from "@/app/libs/session";
import userService from "@/app/services/userService";
import { SearchParams } from "@/app/types";
import { Suspense } from "react";

export default async function RingingCallPage({ searchParams }: SearchParams) {
  const sp = await searchParams;

  const { token, currentUser } = await getServerSession();

  const callerId = sp.callerId;
  const calleeId = sp.calleeId || "";

  const user = await userService.getById(callerId ? callerId : calleeId, token);

  return (
    <Suspense fallback={<RingingCallSpinner />}>
      <RingingCall user={user} currentUser={currentUser} token={token} />
    </Suspense>
  );
}
