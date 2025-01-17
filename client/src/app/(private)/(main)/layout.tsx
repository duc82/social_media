import Header from "@/app/components/Header";
import IncomingCallModal from "@/app/components/RingingCall/IncomingCallModal";
import getServerSession from "@/app/libs/session";
import { PropsWithChildren } from "react";

export default async function PrivateLayout({ children }: PropsWithChildren) {
  const { token } = await getServerSession();

  return (
    <>
      <IncomingCallModal token={token} />
      <Header />
      <main>
        <div className="container">{children}</div>
      </main>
    </>
  );
}
