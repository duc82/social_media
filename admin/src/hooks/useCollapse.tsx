"use client";

import { useEffect, useRef } from "react";
import { Collapse } from "bootstrap";

interface CustomCollapse extends Collapse {
  _element: HTMLElement;
}

export default function useCollapse({
  isSidebarCollapsed,
}: {
  isSidebarCollapsed: boolean;
}) {
  const listRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    const listEl = listRef.current;
    if (!listEl) return;
    let timeout: NodeJS.Timeout | null = null;

    const collapseElList: HTMLElement[] = [];
    listEl.childNodes.forEach((node) => {
      const el = node as HTMLElement;
      const collapseEl = el.childNodes[1] as HTMLElement;
      if (collapseEl) {
        collapseElList.push(collapseEl);
      }
    });

    const collapseList = collapseElList.map(
      (el) => new Collapse(el, { toggle: false }) as CustomCollapse
    );

    collapseList.forEach((collapse) => {
      Array.from([
        collapse._element,
        collapse._element.previousElementSibling,
      ]).forEach((el) => {
        el?.addEventListener("mouseenter", () => {
          if (!isSidebarCollapsed) return;

          if (timeout) clearTimeout(timeout);
          collapse._element.style.top = el.parentElement?.offsetTop + "px";
          collapse.show();
        });

        el?.addEventListener("mouseleave", () => {
          if (!isSidebarCollapsed) return;

          timeout = setTimeout(() => {
            collapse.hide();
          }, 200);
        });
      });

      collapse._element.addEventListener("show.bs.collapse", (e) => {
        const trigeredEl = e.target as HTMLElement;

        trigeredEl.previousElementSibling?.setAttribute(
          "aria-expanded",
          "true"
        );

        if (isSidebarCollapsed) {
          e.preventDefault();
          trigeredEl.style.height = "auto";
          trigeredEl.classList.add("show");
        }

        collapseList.forEach((c) => {
          const collapseEl = c._element;
          if (c !== collapse && collapseEl.classList.contains("show")) {
            c.hide();
            collapseEl.previousElementSibling?.setAttribute(
              "aria-expanded",
              "false"
            );
          }
        });
      });

      collapse._element.addEventListener("hide.bs.collapse", (e) => {
        const trigeredEl = e.target as HTMLElement;
        trigeredEl.previousElementSibling?.setAttribute(
          "aria-expanded",
          "false"
        );

        if (isSidebarCollapsed) {
          e.preventDefault();
          trigeredEl.style.height = "0";
          trigeredEl.classList.remove("show");
        }
      });
    });
  }, [isSidebarCollapsed]);

  return { listRef };
}
