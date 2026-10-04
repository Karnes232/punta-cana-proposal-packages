import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

/**
 * The site's read client. It uses Sanity's CDN, so published edits can take
 * a short while to appear on blog, story and page content.
 *
 * The experience catalog (proposals, dinners, and the request API) needs
 * current prices and availability, so it reads through `uncachedClient` in
 * src/sanity/queries/ExperienceCatalog/client.ts, which skips the CDN.
 * Studio tools use `useClient({ apiVersion })`; scripts in scripts/ create
 * their own write clients.
 */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});
