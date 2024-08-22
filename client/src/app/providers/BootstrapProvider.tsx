"use client";
import {
  createContext,
  PropsWithChildren,
  useLayoutEffect,
  useState,
} from "react";
import { usePathname } from "next/navigation";
import { Tooltip, Popover } from "bootstrap";

export const BootstrapContext = createContext<any>(undefined);

export function BootstrapProvider({ children }: PropsWithChildren) {
  const [bootstrap, setBootstrap] = useState<any>();
  const pathname = usePathname();

  useLayoutEffect(() => {
    const bootstrap = require("bootstrap/dist/js/bootstrap.bundle.min.js");
    setBootstrap(bootstrap);
  }, []);

  useLayoutEffect(() => {
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
          container: "body",
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
