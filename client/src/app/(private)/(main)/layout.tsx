import Header from "@/app/components/Header";
import IncomingCallModal from "@/app/components/RingingCall/IncomingCallModal";
import { PropsWithChildren } from "react";

export default function PrivateLayout({ children }: PropsWithChildren) {
  return (
    <>
      <IncomingCallModal />
      <Header />
      <main>
        <div className="container">{children}</div>
      </main>
    </>
  );
}
