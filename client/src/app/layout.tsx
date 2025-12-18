import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "@/app/assets/scss/globals.scss";
import NextAuthProvider from "./providers/NextAuthProvider";
import NextThemeProvider from "./providers/NextThemeProvider";
import Toaster from "./libs/Toaster";
import { PropsWithChildren } from "react";
import BootstrapNoSSRProvider from "./providers/BootstrapNoSSRProvider";
import ProgressBar from "./libs/ProgressBar";

const font = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Social Media",
  description:
    "Social Media is a social media platform that allows users to share their thoughts, photos, and videos with their friends and family.",
  keywords:
    "social media, social network, social platform, social sharing, social media platform",
  openGraph: {
    type: "website",
    siteName: "Social Media",
    url: "https://socialmedia-next.vercel.app",
    title: "Social Media",
    description:
      "Social Media is a social media platform that allows users to share their thoughts, photos, and videos with their friends and family.",
  },
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={font.className}>
        <NextAuthProvider>
          <BootstrapNoSSRProvider>
            <NextThemeProvider>
              {children}
              <Toaster />
              <ProgressBar />
            </NextThemeProvider>
          </BootstrapNoSSRProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
