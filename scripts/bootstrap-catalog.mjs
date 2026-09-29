// Run with: node --env-file=.env.local scripts/bootstrap-catalog.mjs
// Idempotent: never replaces or deletes existing documents. No sample products.
import { createClient } from "@sanity/client";
const token = process.env.SANITY_API_WRITE_TOKEN;
if (!token) throw Error("Set SANITY_API_WRITE_TOKEN in your local environment");
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token,
  apiVersion: "2026-03-07",
  useCdn: false,
});
const existingDinner = await client.fetch(
  '*[_type=="romanticDinnerExperience"][0]._id',
  {},
  { perspective: "raw" },
);
const approvedDinner = {
  _id: "drafts.romanticDinnerInitial",
  _type: "romanticDinnerExperience",
  internalTitle: "Initial dinner configuration",
  active: false,
  basePrice: 849,
  currency: "USD",
  includedGuests: 2,
  includedDurationMinutes: 120,
};
await client
  .transaction()
  .createIfNotExists({
    _id: "experienceCatalogSettings",
    _type: "experienceCatalogSettings",
  })
  .createIfNotExists({ _id: "catalogHome", _type: "catalogHome" })
  .createIfNotExists({ _id: "catalogContact", _type: "catalogContact" })
  .createIfNotExists(
    existingDinner
      ? { _id: existingDinner, _type: "romanticDinnerExperience" }
      : approvedDinner,
  )
  .commit();
console.log(
  "Catalog settings created; approved dinner values saved in an inactive draft. Existing content preserved.",
);
