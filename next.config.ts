import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    qualities: [65, 70, 75, 80, 85, 90, 95, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
    // Update image caching to match 3-day revalidation
    minimumCacheTTL: 259200, // 3 days
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
