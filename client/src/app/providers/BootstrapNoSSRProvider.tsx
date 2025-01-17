"use client";

import dynamic from "next/dynamic";
import { PropsWithChildren } from "react";

const BootstrapProvider = dynamic(() => import("./BootstrapProvider"), {
  ssr: false,
});

export default function BootstrapNoSSRProvider({
  children,
}: PropsWithChildren) {
  return <BootstrapProvider>{children}</BootstrapProvider>;
}
