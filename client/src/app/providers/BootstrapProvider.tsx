"use client";
import { createContext, PropsWithChildren, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { Tooltip, Popover } from "bootstrap";
import * as bootstrap from "bootstrap";

export const BootstrapContext = createContext<typeof bootstrap>(bootstrap);

export function BootstrapProvider({ children }: PropsWithChildren) {
  const pathname = usePathname();

  useLayoutEffect(() => {
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
  }, [pathname]);

  return (
    <BootstrapContext.Provider value={bootstrap}>
      {children}
    </BootstrapContext.Provider>
  );
}
