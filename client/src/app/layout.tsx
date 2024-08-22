import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "zuck.js/css";
import "zuck.js/skins/snapgram";
import "@/app/assets/styles/globals.scss";
import NextAuthProvider from "./providers/NextAuthProvider";
import NextThemeProvider from "./providers/NextThemeProvider";
import Toaster from "./libs/Toaster";
import { BootstrapProvider } from "./providers/BootstrapProvider";
import { PropsWithChildren } from "react";

const font = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Social Media",
  description: "Social",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={font.className}>
        <NextAuthProvider>
          <BootstrapProvider>
            <NextThemeProvider>
              {children}
              <Toaster />
            </NextThemeProvider>
          </BootstrapProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
