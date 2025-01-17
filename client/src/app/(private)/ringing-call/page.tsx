import RingingCall from "@/app/components/RingingCall";
import getServerSession from "@/app/libs/session";
import userService from "@/app/services/userService";
import { SearchParams } from "@/app/types";

export default async function RingingCallPage({ searchParams }: SearchParams) {
  const sp = await searchParams;

  const { token, currentUser } = await getServerSession();

  const callerId = sp.callerId;
  const calleeId = sp.calleeId || "";

  const user = await userService.getById(callerId ? callerId : calleeId, token);

  return <RingingCall user={user} currentUser={currentUser} />;
}
