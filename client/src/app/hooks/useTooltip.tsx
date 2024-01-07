import { useEffect } from "react";
import useBootstrap from "./useBootstrap";

export default function useTooltip() {
  const bootstrap = useBootstrap();

  useEffect(() => {
    if (!bootstrap) return;

    const tooltipTriggerList = document.querySelectorAll(
      '[data-bs-toggle="tooltip"]'
    );

    console.log(tooltipTriggerList);
    const tooltipList = [...tooltipTriggerList].map(
      (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
    );

    return () => {
      tooltipList.forEach((tooltip) => tooltip.dispose());
    };
  }, [bootstrap]);
}
