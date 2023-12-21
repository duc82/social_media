"use client";
import { ThemeProvider } from "next-themes";

export default function NextThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider attribute="data-bs-theme" enableColorScheme={false}>
      {children}
    </ThemeProvider>
  );
}
