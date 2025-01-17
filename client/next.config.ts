import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
      },
    ],
  },
  output: "standalone",

  reactStrictMode: true,
  sassOptions: {
    api: "modern-compiler",
    quietDeps: true,
    // Silence deprecation warnings for sass imports
    silenceDeprecations: [
      "import",
      "global-builtin",
      "legacy-js-api",
      "mixed-decls",
      "color-functions",
    ],
  },
};

export default nextConfig;
