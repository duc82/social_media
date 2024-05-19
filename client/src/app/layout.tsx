import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "zuck.js/css";
import "zuck.js/skins/snapgram";
import "overlayscrollbars/overlayscrollbars.css";
import "./styles/globals.scss";
import NextAuthProvider from "./providers/NextAuthProvider";
import NextThemeProvider from "./providers/NextThemeProvider";
import BootstrapProvider from "./providers/BootstrapProvider";
import Toaster from "./libs/Toaster";

const font = Inter({ subsets: ["latin"] });

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
