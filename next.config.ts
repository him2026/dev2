import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  serverExternalPackages: ["@prisma/client", "bcryptjs"],
  async redirects() {
    return [
      {
        source: "/period-tracker-app",
        destination: "/online-period-tracker",
        permanent: true,
      },
      {
        source: "/women-wellness-app",
        destination: "/wellness-for-women",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
