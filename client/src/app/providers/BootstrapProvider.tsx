"use client";
import { useEffect, useState } from "react";
import BootstrapContext from "../context/BootstrapContext";
import { usePathname } from "next/navigation";

export default function BootstrapProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [bootstrap, setBootstrap] = useState<any>();
  const pathname = usePathname();

  useEffect(() => {
    const bootstrap = require("bootstrap/dist/js/bootstrap.bundle.min.js");
    setBootstrap(bootstrap);
  }, []);

  useEffect(() => {
    if (!bootstrap) return;

    const tooltipTriggerList = document.querySelectorAll(
      '[data-bs-tooltip="tooltip"]'
    );

    const tooltips = [...tooltipTriggerList].map(
      (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
    );

    return () => {
      tooltips.forEach((tooltip) => tooltip.dispose());
    };
  }, [bootstrap, pathname]);

  return (
    <BootstrapContext.Provider value={bootstrap}>
      {children}
    </BootstrapContext.Provider>
  );
}
