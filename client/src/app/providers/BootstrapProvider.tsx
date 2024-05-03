"use client";
import { useEffect, useState } from "react";
import BootstrapContext from "../contexts/BootstrapContext";
import { usePathname } from "next/navigation";
import { Tooltip, Popover } from "bootstrap";

export default function BootstrapProvider({
  children
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
      '[data-bs-toggle="tooltip"], [data-bs-tooltip="true"]'
    );

    const tooltips: Tooltip[] = [...tooltipTriggerList].map(
      (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
    );

    const popoverTriggerList = document.querySelectorAll(
      '[data-bs-toggle="popover"], [data-bs-popover="true"]'
    );

    const popovers: Popover[] = [...popoverTriggerList].map(
      (popoverTriggerEl) =>
        new bootstrap.Popover(popoverTriggerEl, {
          container: "body"
        })
    );

    return () => {
      tooltips.forEach((tooltip) => tooltip.dispose());
      popovers.forEach((popover) => popover.dispose());
    };
  }, [pathname, bootstrap]);

  return (
    <BootstrapContext.Provider value={bootstrap}>
      {children}
    </BootstrapContext.Provider>
  );
}
