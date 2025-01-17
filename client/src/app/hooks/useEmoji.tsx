"use client";
import { useEffect, useRef, useState } from "react";

export default function useEmoji() {
  const [isOpenEmoji, setOpenEmoji] = useState(false);
  const emojiRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const emojiEl = emojiRef.current;
      if (!emojiEl) return;
      const el = e.target as HTMLElement;

      if (!emojiEl.contains(el) && isOpenEmoji) {
        setOpenEmoji(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpenEmoji]);

  return { isOpenEmoji, setOpenEmoji, emojiRef };
}
