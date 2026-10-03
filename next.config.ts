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
  // The legacy category pages were retired when their packages moved to
  // /proposals (proposalExperience). Keep old links and search results working.
  async redirects() {
    const category = ":category(classic|modern|dining|adventure)-proposals";
    return ["", "/es"].flatMap((prefix) => [
      {
        source: `${prefix}/${category}`,
        destination: `${prefix}/proposals`,
        permanent: true,
      },
      {
        source: `${prefix}/${category}/:slug`,
        destination: `${prefix}/proposals#:slug`,
        permanent: true,
      },
    ]);
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
