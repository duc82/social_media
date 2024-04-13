import path from "path";

// @ts-check
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com"
      },
      {
        protocol: "https",
        hostname: "cdn.dummyjson.com"
      }
    ]
  },
  sassOptions: {
    includePaths: [path.join(import.meta.dirname, "styles")]
  },
  reactStrictMode: true
};

export default nextConfig;
