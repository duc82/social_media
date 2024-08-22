import LeftSidebar from "@/app/components/Settings/LeftSidebar";
import { PropsWithChildren } from "react";

export default function SettingsLayout({ children }: PropsWithChildren) {
  return (
    <div className="row">
      <LeftSidebar />
      <div className="col-lg-9 vstack gap-4">{children}</div>
    </div>
  );
}
