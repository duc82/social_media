import path from "path";

// @ts-check

const __dirname = path.resolve();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.dummyjson.com",
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
    ],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "src/app", "styles")],
  },
  reactStrictMode: true,
};

export default nextConfig;
