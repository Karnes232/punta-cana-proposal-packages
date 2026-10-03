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

const localized = (value, type = "localizedString") =>
  value
    ? { _type: type, en: value.en ?? "", es: value.es ?? value.en ?? "" }
    : undefined;

// Legacy alt text is one English string; the new model stores {en, es}.
const image = (source) =>
  source?.asset
    ? {
        _type: "image",
        asset: { _type: "reference", _ref: source.asset._ref },
        ...(source.hotspot ? { hotspot: source.hotspot } : {}),
        ...(source.crop ? { crop: source.crop } : {}),
        alt: {
          _type: "localizedString",
          en: source.alt ?? "",
          es: source.alt ?? "",
        },
      }
    : undefined;

const missingSpanish = (value) => value?.en && !value?.es;

function migrate(pkg, displayOrder) {
  const slug = pkg.slug.current;
  const report = { slug, notes: [] };

  const legacyGallery = pkg.gallery ?? [];
  const photos = [{ _key: "main", ...pkg.image }, ...legacyGallery];
  const gallery = photos.map((photo, index) => {
    const img = image(photo);
    return {
      _key: photo._key,
      _type: "experiencePhoto",
      image: img,
      alt: img?.alt,
      displayOrder: index,
      ...(withCaptions && photo.caption
        ? { caption: localized(photo.caption) }
        : {}),
    };
  });
  const captions = legacyGallery.filter(
    (p) => p.caption?.en || p.caption?.es,
  ).length;
  if (captions && !withCaptions)
    report.notes.push(`${captions} gallery caption(s) not copied`);

  // Same fallback as getLegacyProposals: the hero for the first style, then the
  // gallery photo before it, so each style shows the image it shows today.
  const styles = (pkg.variants ?? []).map((variant, index) => {
    const fallback =
      index === 0 ? pkg.image : (legacyGallery[index - 1] ?? pkg.image);
    if (!variant.image?.asset)
      report.notes.push(`style ${index + 1} image from fallback`);
    if (missingSpanish(variant.name))
      report.notes.push(`style ${index + 1} name has no Spanish`);
    return {
      _key: variant._key,
      _type: "proposalStyle",
      name: localized(variant.name),
      description: localized(variant.description, "localizedText"),
      price: variant.price,
      mainImage: image(variant.image?.asset ? variant.image : fallback),
      active: true,
      displayOrder: index,
    };
  });

  const inclusions = (pkg.inclusions ?? []).map((inclusion, index) => {
    if (missingSpanish(inclusion.title))
      report.notes.push(
        `inclusion "${inclusion.title.en}" has no Spanish title`,
      );
    return {
      _key: inclusion._key,
      _type: "experienceInclusion",
      name: localized(inclusion.title),
      description: localized(inclusion.description, "localizedText"),
      icon: inclusion.icon,
      active: true,
      displayOrder: index,
    };
  });

  const addons = (pkg.addons ?? []).map((addon, index) => ({
    _id: `legacy-addon-${slug}-${addon._key}`,
    _type: "experienceAddon",
    internalTitle: `${pkg.name?.en ?? slug}: ${addon.name?.en ?? addon._key}`,
    name: localized(addon.name),
    description: localized(addon.description, "localizedText"),
    price: addon.price,
    pricingType: "fixed",
    applicableTo: ["proposal"],
    icon: addon.icon,
    active: true,
    displayOrder: index,
  }));

  const meta = pkg.seo?.meta;
  const seo = pkg.seo
    ? {
        _type: "experienceSeo",
        title: localized({ en: meta?.en?.title, es: meta?.es?.title }),
        description: localized(
          { en: meta?.en?.description, es: meta?.es?.description },
          "localizedText",
        ),
        ...(pkg.seo.openGraph?.image?.asset
          ? { image: image(pkg.seo.openGraph.image) }
          : {}),
        noIndex: pkg.seo.noIndex ?? false,
      }
    : undefined;
  if (pkg.seo)
    report.notes.push(
      "SEO keywords, Open Graph text and structured data have no field (dropped)",
    );

  const proposal = {
    _id: `proposal-${slug}`,
    _type: "proposalExperience",
    internalTitle: `${pkg.name?.en ?? slug} (migrated from ${pkg._id})`,
    name: localized(pkg.name),
    slug: { _type: "slug", current: slug },
    shortDescription: localized(pkg.description, "localizedText"),
    basePrice: pkg.price,
    currency: "USD",
    gallery,
    styles,
    inclusions,
    availableAddons: addons.map((addon) => ({
      _key: addon._id,
      _type: "reference",
      _ref: addon._id,
    })),
    active: true,
    displayOrder,
    ...(seo ? { seo } : {}),
  };

  Object.assign(report, {
    id: proposal._id,
    price: pkg.price,
    photos: gallery.length,
    styles: styles.length,
    inclusions: inclusions.length,
    addons: addons.length,
  });
  return { proposal, addons, report };
}

const planned = legacy.map((pkg, index) => migrate(pkg, index));

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
