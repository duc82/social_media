import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./styles/scss/globals.scss";
import dynamic from "next/dynamic";
import ToastProvider from "./providers/ToastProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Social",
  description: "Social",
};

dynamic(() => require("bootstrap/dist/js/bootstrap.bundle.min.js"), {
  ssr: false,
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastProvider />
        {children}
      </body>
    </html>
  );
}
