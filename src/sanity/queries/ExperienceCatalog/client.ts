import { client } from "@/sanity/lib/client";

/**
 * Catalog reads skip the Sanity CDN so prices and availability are current.
 * Each query still sets its own Next.js cache option: list pages revalidate
 * every 60 seconds, while single lookups used for requests are not cached.
 */
export const uncachedClient = client.withConfig({
  useCdn: false,
  perspective: "published",
});
