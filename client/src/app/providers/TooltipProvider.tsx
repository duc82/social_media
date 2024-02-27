"use client";
import { useEffect } from "react";
import useBootstrap from "../hooks/useBootstrap";
import { usePathname } from "next/navigation";

export default function TooltipProvider() {
  const bootstrap = useBootstrap();
  const pathname = usePathname();

  useEffect(() => {
    if (!bootstrap) return;

    const tooltipTriggerList = document.querySelectorAll(
      '[data-bs-tooltip="tooltip"]'
    );

    const tooltipList = [...tooltipTriggerList].map(
      (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
    );

    return () => {
      tooltipList.forEach((tooltip) => tooltip.dispose());
    };
  }, [bootstrap, pathname]);

  return null;
}
