import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "zuck.js/css";
import "zuck.js/skins/snapgram";
import "./styles/scss/globals.scss";
import ToastProvider from "./providers/ToastProvider";
import NextAuthProvider from "./providers/NextAuthProvider";
import NextThemeProvider from "./providers/NextThemeProvider";
import BootstrapProvider from "./providers/BootstrapProvider";
import GLightboxProvider from "./providers/GLightboxProvider";
import TooltipProvider from "./providers/TooltipProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Social Media",
  description: "Social",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <NextAuthProvider>
          <NextThemeProvider>
            <BootstrapProvider>
              {children}
              <GLightboxProvider />
              <ToastProvider />
              <TooltipProvider />
            </BootstrapProvider>
          </NextThemeProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
