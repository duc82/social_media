import path from "path";

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
    includePaths: [path.join(__dirname, "styles")]
  },
  reactStrictMode: true
};

module.exports = nextConfig;