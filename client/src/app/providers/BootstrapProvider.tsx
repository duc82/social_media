"use client";
import { useEffect, useState } from "react";
import BootstrapContext from "../context/BootstrapContext";

export default function BootstrapProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [bootstrap, setBootstrap] = useState<any>();

  useEffect(() => {
    const bootstrap = require("bootstrap/dist/js/bootstrap.bundle.min.js");

    setBootstrap(bootstrap);
  }, []);

  return (
    <BootstrapContext.Provider value={bootstrap}>
      {children}
    </BootstrapContext.Provider>
  );
}
