// Copies legacy IndividualProposalPackage documents into proposalExperience
// documents (plus experienceAddon documents for their add-ons).
//
// Dry run (default; writes nothing, saves the planned documents to work/):
//   node --env-file=.env.local scripts/migrate-legacy-proposals.mjs --dataset migration-test
// Apply:
//   node --env-file=.env.local scripts/migrate-legacy-proposals.mjs --dataset migration-test --apply
//
// The output mirrors what getLegacyProposals() in
// src/sanity/queries/ExperienceCatalog.ts renders today, so /proposals looks
// the same before and after: hero first in the gallery (not deduplicated),
// English alt text reused for Spanish, the same style-image fallback, and no
// gallery captions (pass --with-captions to copy them; they would then show).
// Re-running is safe: every document is written with createOrReplace under a
// deterministic id. Legacy documents are never modified.
import { mkdirSync, writeFileSync } from "node:fs";
import { createClient } from "@sanity/client";
import { mapLegacyProposal } from "./lib/legacyProposal.mjs";

const args = process.argv.slice(2);
const flag = (name) => args.includes(name);
const option = (name) => {
  const i = args.indexOf(name);
  return i === -1 ? undefined : args[i + 1];
};

const apply = flag("--apply");
const withCaptions = flag("--with-captions");
const dataset = option("--dataset") || process.env.NEXT_PUBLIC_SANITY_DATASET;
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const token = process.env.SANITY_API_WRITE_TOKEN;
if (!projectId || !dataset)
  throw Error("Set NEXT_PUBLIC_SANITY_PROJECT_ID and pass --dataset");
if (apply && !token)
  throw Error("Set SANITY_API_WRITE_TOKEN to apply the migration");

// Same exclusion as the public catalog queries (see docs/experience-catalog.md).
const EXCLUDED_ID = "b861ebcd-1ba0-43a9-b699-8a11c2ef2e93";
const EXCLUDED_SLUG = "adventure-to-yes";

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2026-03-07",
  useCdn: false,
});

const legacy = await client.fetch(
  `*[_type == "IndividualProposalPackage" && _id != $excludedId
     && coalesce(slug.current, "") != $excludedSlug] | order(name.en asc)`,
  { excludedId: EXCLUDED_ID, excludedSlug: EXCLUDED_SLUG },
  { perspective: "published" },
);

const planned = legacy.map((pkg, index) =>
  mapLegacyProposal(pkg, index, { withCaptions }),
);

mkdirSync("work", { recursive: true });
const outFile = `work/migration-${dataset}.json`;
writeFileSync(
  outFile,
  JSON.stringify(
    planned.map(({ proposal, addons }) => ({ proposal, addons })),
    null,
    2,
  ),
);

console.table(
  planned.map(({ report: r }) => ({
    slug: r.slug,
    id: r.id,
    price: r.price,
    photos: r.photos,
    styles: r.styles,
    inclusions: r.inclusions,
    addons: r.addons,
  })),
);
for (const { report } of planned) {
  const notes = report.notes.filter((n) => !n.startsWith("SEO"));
  if (notes.length) console.log(`  ${report.slug}: ${notes.join("; ")}`);
}
console.log(
  `\n${planned.length} packages from dataset "${dataset}". Planned documents saved to ${outFile}.`,
);

if (!apply) {
  console.log("Dry run: nothing written. Re-run with --apply to write.");
  process.exit(0);
}

for (const { proposal, addons } of planned) {
  let tx = client.transaction();
  for (const addon of addons) tx = tx.createOrReplace(addon);
  tx = tx.createOrReplace(proposal);
  await tx.commit({ visibility: "async" });
  console.log(`wrote ${proposal._id} (+${addons.length} add-ons)`);
}
console.log(`Done: ${planned.length} proposals written to "${dataset}".`);
