// Moves Studio content onto the renamed schemas (Studio step 2).
//
// Dry run (default; writes nothing, saves the plan to work/):
//   node --env-file=.env.local scripts/migrate-studio-content.mjs --dataset migration-test
// Apply phases 1-3 (copies only; the live site keeps reading the originals):
//   node --env-file=.env.local scripts/migrate-studio-content.mjs --dataset production --apply
// Once the new code is live, delete the originals:
//   node --env-file=.env.local scripts/migrate-studio-content.mjs --dataset production --phases 4 --apply
//
// Phases:
//   1. "Adventure to Yes" (legacy package) becomes an inactive proposalExperience.
//   2. Catalog Settings, Home and Contact get real documents; Catalog Home's
//      hero photo is filled from the legacy HomePageHero image.
//   3. Every document of a renamed type is copied to its new type and ID, and
//      references to it (copies, blog posts…) are pointed at the copy. One
//      transaction, so the dataset never holds half a rename.
//   4. Deletes the originals, the legacy proposal documents, the dead old-home
//      documents, the retired category SEO entries and the legacy hero, in one
//      transaction. It checks first that every copy exists and that nothing
//      else still references what it deletes.
//   5. Fills the empty catalog documents (Settings, Home, Contact) and the
//      Proposals / Romantic dinners SEO titles with exactly what the site shows
//      today: the default texts from src/lib/experience/ and the photos and
//      featured proposals the site picks automatically. Only blank fields are
//      written, so the website doesn't change and Studio edits are kept.
//      Run it on its own: --phases 5
//
// Phases 1-3 only create documents that don't exist yet (createIfNotExists),
// so re-running never overwrites edits made in the Studio since.
import { spawnSync } from "node:child_process";
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { resolve } from "node:path";
import { createClient } from "@sanity/client";
import { mapLegacyProposal } from "./lib/legacyProposal.mjs";

const args = process.argv.slice(2);
const flag = (name) => args.includes(name);
const option = (name) => {
  const i = args.indexOf(name);
  return i === -1 ? undefined : args[i + 1];
};

const apply = flag("--apply");
const phases = new Set((option("--phases") ?? "1,2,3").split(",").map(Number));
const dataset = option("--dataset") || process.env.NEXT_PUBLIC_SANITY_DATASET;
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const token = process.env.SANITY_API_WRITE_TOKEN;
if (!projectId || !dataset)
  throw Error("Set NEXT_PUBLIC_SANITY_PROJECT_ID and pass --dataset");
if (!token) throw Error("Set SANITY_API_WRITE_TOKEN (drafts are read too)");

// Copies of src/sanity/constants.ts (scripts can't import TypeScript).
const SEO_PAGES = [
  "home",
  "proposals",
  "romantic-dinners",
  "stories",
  "blog",
  "faq",
  "how-it-works",
  "contact",
  "privacy-policy",
  "terms-of-service",
];
const CATALOG_SINGLETONS = [
  "experienceCatalogSettings",
  "catalogHome",
  "catalogContact",
];

const DINNER_TEMPLATE_ID = "8d9e1e5f-d981-4276-ab95-8d88a3ebd429";
const FEATURED_FALLBACK_SLUGS = [
  "love-signature",
  "path-of-love",
  "marry-me-sign",
];
const PROPOSALS_HERO_SLUG = "love-signature";

const ADVENTURE_ID = "b861ebcd-1ba0-43a9-b699-8a11c2ef2e93";
const ADVENTURE_NEW_ID = "proposal-adventure-to-yes";
const LEGACY_HERO_ID = "hero";

// Old type → new type and how the new document ID is chosen:
//   "singleton"  → the new type name (like the catalog singletons)
//   "collection" → `${newType}-${oldId}` (keeps today's ID order)
//   a function   → from the document; null means "not copied"
const RENAMES = {
  PageSeo: {
    type: "pageSeo",
    id: (doc) =>
      SEO_PAGES.includes(doc.pageName) ? `pageSeo-${doc.pageName}` : null,
  },
  legalDocuments: {
    type: "legalDocument",
    id: (doc) => `legalDocument-${doc.pageName}`,
  },
  StoriesPageHero: { type: "storiesHero", id: "singleton" },
  StoriesPageCtaStrip: { type: "storiesCtaStrip", id: "singleton" },
  ProposalType: { type: "storyType", id: "collection" },
  individualStory: { type: "story", id: "collection" },
  BlogPageHero: { type: "blogHero", id: "singleton" },
  BlogPageCtaStrip: { type: "blogCtaStrip", id: "singleton" },
  BlogCategory: { type: "blogCategory", id: "collection" },
  FaqsPageHeroComponent: { type: "faqHero", id: "singleton" },
  FaqsPageFaqContactStrip: { type: "faqContactStrip", id: "singleton" },
  FaqsPageFaqs: { type: "faq", id: "collection" },
  FaqsPageFaqsCategories: { type: "faqCategory", id: "collection" },
  HowItWorksPageHero: { type: "howItWorksHero", id: "singleton" },
  HowItWorksPageHowItWorksSteps: { type: "howItWorksSteps", id: "singleton" },
  HowItWorksPageHowItWorksFAQ: { type: "howItWorksFaq", id: "singleton" },
  HowItWorksPageHowItWorksFaqCategory: {
    type: "howItWorksFaqCategory",
    id: "collection",
  },
  HowItWorksPageHowItWorksCTA: { type: "howItWorksCta", id: "singleton" },
};
// The page is now the document ID, so the field has no schema anymore.
const DROPPED_FIELDS = ["pageName"];

const LEGACY_PROPOSAL_TYPES = [
  "IndividualProposalPackage",
  "ProposalPackages",
  "ProposalPackageHeader",
];
const DEAD_TYPES = [
  "HomePageBrandStatement",
  "HomePageCTABanner",
  "HomePageFeatureStory",
  "HomePageFeatureStorySection",
  "HomePageHowItWorks",
  "HomePagePackageCategories",
  "trustIndicators",
  "ContactPageContent",
];

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2026-03-07",
  useCdn: false,
  perspective: "raw",
});

const exists = async (ids) =>
  new Set(await client.fetch(`*[_id in $ids]._id`, { ids }));

const plan = { dataset, phases: [...phases], steps: [] };
const problems = [];
const step = (phase, title, mutations, notes = []) => {
  plan.steps.push({ phase, title, notes, mutations });
  console.log(`\nPhase ${phase}: ${title}`);
  for (const note of notes) console.log(`  ${note}`);
  console.log(`  ${mutations.length} mutation(s)`);
};

// --- Schema check: every written document must fit schema.json -------------

const schema = JSON.parse(readFileSync("schema.json", "utf8"));
const schemaTypes = new Map(schema.map((t) => [t.name, t]));
const knownTypeValues = new Set([
  "reference",
  "image",
  "file",
  "slug",
  "block",
  "span",
]);
(function collect(node) {
  if (Array.isArray(node)) return node.forEach(collect);
  if (!node || typeof node !== "object") return;
  if (node._type?.value?.value) knownTypeValues.add(node._type.value.value);
  if (node.name && node.type) knownTypeValues.add(node.name);
  Object.values(node).forEach(collect);
})(schema);

// Top-level array fields whose items have one fixed _type (e.g. "photo").
function arrayItemTypes(typeName) {
  const attributes = schemaTypes.get(typeName)?.attributes ?? {};
  return Object.fromEntries(
    Object.entries(attributes)
      .map(([key, a]) => [key, a.value?.of?.attributes?._type?.value?.value])
      .filter(([, item]) => item && item !== "reference"),
  );
}

function checkAgainstSchema(doc) {
  const type = schemaTypes.get(doc._type);
  if (!type) return problems.push(`${doc._id}: unknown type ${doc._type}`);
  for (const key of Object.keys(doc))
    if (!key.startsWith("_") && !(key in type.attributes))
      problems.push(`${doc._id}: field "${key}" isn't in ${doc._type}`);
  for (const [key, item] of Object.entries(arrayItemTypes(doc._type)))
    for (const member of doc[key] ?? [])
      if (member?._type !== item)
        problems.push(
          `${doc._id}: ${key} item is ${member?._type}, not ${item}`,
        );
  (function walk(value, path) {
    if (Array.isArray(value))
      return value.forEach((v, i) => walk(v, `${path}[${i}]`));
    if (!value || typeof value !== "object") return;
    if (typeof value._type === "string" && !knownTypeValues.has(value._type))
      problems.push(
        `${doc._id}: ${path || "."} has unknown _type ${value._type}`,
      );
    for (const [k, v] of Object.entries(value))
      walk(v, path ? `${path}.${k}` : k);
  })(doc, "");
}

// --- References ---------------------------------------------------------------

// [patch path, referenced ID] for every reference in a value. Array items are
// addressed by _key when they have one, like the Studio does.
function refPaths(value, path = "", out = []) {
  if (Array.isArray(value))
    value.forEach((item, i) =>
      refPaths(
        item,
        `${path}[${item?._key ? `_key=="${item._key}"` : i}]`,
        out,
      ),
    );
  else if (value && typeof value === "object")
    for (const [key, v] of Object.entries(value)) {
      const p = path ? `${path}.${key}` : key;
      if (key === "_ref" && typeof v === "string") out.push([p, v]);
      else refPaths(v, p, out);
    }
  return out;
}

function rewriteRefs(value, idMap) {
  if (Array.isArray(value)) return value.map((v) => rewriteRefs(v, idMap));
  if (!value || typeof value !== "object") return value;
  return Object.fromEntries(
    Object.entries(value).map(([key, v]) => [
      key,
      key === "_ref" && idMap.has(v) ? idMap.get(v) : rewriteRefs(v, idMap),
    ]),
  );
}

const withoutSystemFields = (doc) => {
  const copy = { ...doc };
  for (const key of ["_rev", "_createdAt", "_updatedAt", "_system"])
    delete copy[key];
  return copy;
};

// --- Phase 1: Adventure to Yes -----------------------------------------------

async function adventurePhase() {
  const legacy = await client.fetch(`*[_id == $id][0]`, { id: ADVENTURE_ID });
  if (!legacy) {
    const done = await exists([ADVENTURE_NEW_ID]);
    if (!done.has(ADVENTURE_NEW_ID))
      problems.push(`Neither ${ADVENTURE_ID} nor ${ADVENTURE_NEW_ID} exists`);
    return step(1, "Adventure to Yes", [], ["legacy document already gone"]);
  }
  const maxOrder = await client.fetch(
    `math::max(*[_type == "proposalExperience"].displayOrder)`,
  );
  const { proposal, addons, report } = mapLegacyProposal(
    legacy,
    (maxOrder ?? 0) + 1,
    { active: false },
  );
  [...addons, proposal].forEach(checkAgainstSchema);
  step(
    1,
    "Adventure to Yes → inactive proposalExperience",
    [...addons, proposal].map((doc) => ({ createIfNotExists: doc })),
    [
      `${proposal._id}: ${report.styles} styles, ${report.photos} photos, ${report.addons} add-ons, active: false`,
      ...report.notes,
    ],
  );
}

// --- Phase 2: catalog documents ----------------------------------------------

async function catalogPhase() {
  const hero = await client.fetch(`*[_id == $id][0].image`, {
    id: LEGACY_HERO_ID,
  });
  const home = await client.fetch(`*[_id == "catalogHome"][0]{heroImage}`);
  const mutations = CATALOG_SINGLETONS.map((id) => ({
    createIfNotExists: { _id: id, _type: id },
  }));
  const notes = [];
  if (hero?.asset && !home?.heroImage?.asset) {
    const heroImage = {
      _type: "image",
      asset: { _type: "reference", _ref: hero.asset._ref },
      ...(hero.hotspot ? { hotspot: hero.hotspot } : {}),
      ...(hero.crop ? { crop: hero.crop } : {}),
      alt: { _type: "localizedString", en: hero.alt ?? "", es: hero.alt ?? "" },
    };
    checkAgainstSchema({ _id: "catalogHome", _type: "catalogHome", heroImage });
    mutations.push({
      patch: { id: "catalogHome", setIfMissing: { heroImage } },
    });
    notes.push(`catalogHome.heroImage ← ${hero.asset._ref}`);
  } else notes.push("catalogHome.heroImage already set (or no legacy hero)");
  step(2, "Catalog documents", mutations, notes);
}

// --- Phase 3: copy renamed types ---------------------------------------------

async function renamePhase() {
  const oldTypes = Object.keys(RENAMES);
  const originals = await client.fetch(`*[_type in $types]`, {
    types: oldTypes,
  });
  const unpublished = originals.filter((d) => d._id.includes("."));
  for (const doc of unpublished)
    problems.push(
      `${doc._id} (${doc._type}) is a draft or version: publish or discard it first`,
    );

  const idMap = new Map();
  const copies = [];
  const notes = [];
  for (const doc of originals.filter((d) => !d._id.includes("."))) {
    const rename = RENAMES[doc._type];
    const newId =
      rename.id === "singleton"
        ? rename.type
        : rename.id === "collection"
          ? `${rename.type}-${doc._id}`
          : rename.id(doc);
    if (!newId) {
      notes.push(`${doc._id} (${doc._type} ${doc.pageName}) not copied`);
      continue;
    }
    if ([...idMap.values()].includes(newId))
      problems.push(`Two documents map to ${newId}`);
    idMap.set(doc._id, newId);
    copies.push({
      ...withoutSystemFields(doc),
      _id: newId,
      _type: rename.type,
    });
  }

  const existing = await client.fetch(`*[_id in $ids]{_id, _type}`, {
    ids: [...idMap.values()],
  });
  for (const doc of existing) {
    const copy = copies.find((c) => c._id === doc._id);
    if (doc._type !== copy._type)
      problems.push(`${doc._id} already exists as ${doc._type}`);
  }
  const existingIds = new Set(existing.map((d) => d._id));

  const docsToCreate = copies
    .filter((copy) => !existingIds.has(copy._id))
    .map((copy) => {
      const doc = rewriteRefs(copy, idMap);
      for (const field of DROPPED_FIELDS) delete doc[field];
      checkAgainstSchema(doc);
      return doc;
    });
  if (existingIds.size)
    notes.push(`${existingIds.size} copies already exist (left as they are)`);

  // Documents that stay (blog posts and their drafts, mostly) but point at an
  // original: point them at the copy instead.
  const deleted = [...oldTypes, ...LEGACY_PROPOSAL_TYPES, ...DEAD_TYPES];
  const referrers = await client.fetch(
    `*[references($ids) && !(_type in $deleted)]`,
    { ids: [...idMap.keys()], deleted },
  );
  const patches = referrers.flatMap((doc) => {
    const set = Object.fromEntries(
      refPaths(withoutSystemFields(doc))
        .filter(([, ref]) => idMap.has(ref))
        .map(([path, ref]) => [path, idMap.get(ref)]),
    );
    return Object.keys(set).length
      ? [{ patch: { id: doc._id, ifRevisionID: doc._rev, set } }]
      : [];
  });
  const byType = {};
  for (const doc of referrers) byType[doc._type] = (byType[doc._type] ?? 0) + 1;

  step(
    3,
    "Copy renamed types and re-point references",
    [...docsToCreate.map((doc) => ({ createIfNotExists: doc })), ...patches],
    [
      `${docsToCreate.length} copies: ${Object.entries(
        Object.groupBy(docsToCreate, (d) => d._type),
      )
        .map(([type, docs]) => `${type} ${docs.length}`)
        .join(", ")}`,
      `${patches.length} referencing documents re-pointed: ${Object.entries(
        byType,
      )
        .map(([type, n]) => `${type} ${n}`)
        .join(", ")}`,
      ...notes,
    ],
  );
  plan.idMap = Object.fromEntries(idMap);
}

// --- Phase 4: delete ---------------------------------------------------------

async function deletePhase() {
  const ids = async (filter, params = {}) =>
    client.fetch(`*[${filter}]._id`, params);
  const groups = [];

  const originals = await client.fetch(
    `*[_type in $types]{_id, _type, pageName}`,
    { types: Object.keys(RENAMES) },
  );
  const expectedCopies = originals.flatMap((doc) => {
    const rename = RENAMES[doc._type];
    const base = doc._id.replace(/^(drafts|versions\.[^.]+)\./, "");
    if (rename.id === "singleton") return [rename.type];
    if (rename.id === "collection") return [`${rename.type}-${base}`];
    const id = rename.id(doc);
    return id ? [id] : [];
  });
  const present = await exists(expectedCopies);
  const missing = expectedCopies.filter((id) => !present.has(id));
  if (missing.length)
    problems.push(`Copies missing (run phase 3 first): ${missing.join(", ")}`);
  groups.push(["Originals of renamed types", originals.map((d) => d._id)]);

  const legacy = await ids(`_type in $types`, { types: LEGACY_PROPOSAL_TYPES });
  if (legacy.includes(ADVENTURE_ID) && !(await exists([ADVENTURE_NEW_ID])).size)
    problems.push(`${ADVENTURE_NEW_ID} missing (run phase 1 first)`);
  groups.push(["Legacy proposal documents", legacy]);

  groups.push([
    "Dead old-home and contact documents",
    await ids(`_type in $types`, { types: DEAD_TYPES }),
  ]);

  const heroSet = await client.fetch(
    `defined(*[_id == "catalogHome"][0].heroImage.asset)`,
  );
  const legacyHero = await ids(`_type == "HomePageHero"`);
  if (legacyHero.length && !heroSet)
    problems.push("catalogHome.heroImage is empty (run phase 2 first)");
  groups.push(["Legacy home hero", legacyHero]);

  const all = groups.flatMap(([, list]) => list);
  const blockers = await client.fetch(
    `*[references($ids) && !(_id in $ids)]{_id, _type}`,
    { ids: all },
  );
  for (const [type, docs] of Object.entries(
    Object.groupBy(blockers, (d) => d._type),
  ))
    problems.push(
      `${docs.length} ${type} document(s) still reference a deleted document (run phase 3 first): ${docs
        .slice(0, 5)
        .map((d) => d._id)
        .join(", ")}${docs.length > 5 ? ", …" : ""}`,
    );

  // One transaction: the groups reference each other (old FAQs → old
  // categories, packages → package categories), so they go together.
  step(
    4,
    "Delete originals and legacy documents",
    all.map((id) => ({ delete: { id } })),
    groups.map(([title, list]) => `${title}: ${list.length}`),
  );
}

// --- Phase 5: fill the catalog documents -------------------------------------

// Catalog Settings texts the site never shows: left empty for the field
// cleanup, so the Studio doesn't offer text that changes nothing.
const UNUSED_SETTINGS = [
  "addonsLabel",
  "beverages",
  "hotel",
  "desiredDate",
  "notes",
  "proposalSectionDescription",
  "dinnerSectionDescription",
];

// The site's default texts, compiled from the TypeScript files it uses (like
// scripts/run-tests.cjs), so the values can't drift from what visitors see.
// `ui` already includes the introduction and dinner policy texts.
function siteDefaults() {
  const out = "work/catalog-defaults";
  rmSync(out, { recursive: true, force: true });
  const run = spawnSync(
    process.execPath,
    [
      "node_modules/typescript/bin/tsc",
      "src/lib/experience/labels.ts",
      "src/lib/experience/homeCopy.ts",
      "--outDir",
      out,
      "--rootDir",
      "src",
      "--module",
      "commonjs",
      "--target",
      "ES2020",
      "--skipLibCheck",
    ],
    { stdio: "inherit" },
  );
  if (run.status !== 0) throw Error("Couldn't compile the default texts");
  const load = createRequire(import.meta.url);
  return {
    ui: load(resolve(out, "lib/experience/labels.js")).ui,
    homeCopy: load(resolve(out, "lib/experience/homeCopy.js")).homeCopy,
  };
}

// Same order as normalizeExperience(): by displayOrder, stable.
const byOrder = (items) =>
  [...(items ?? [])]
    .filter(Boolean)
    .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));
const activeByOrder = (items) =>
  byOrder(items).filter((x) => x.active === true);
const hasPhoto = (image) => Boolean(image?.asset?._ref);

const photo = (image, key, type = "image") => ({
  ...(key ? { _key: key } : {}),
  _type: type,
  asset: { _type: "reference", _ref: image.asset._ref },
  ...(image.hotspot ? { hotspot: image.hotspot } : {}),
  ...(image.crop ? { crop: image.crop } : {}),
  ...(image.alt ? { alt: image.alt } : {}),
});
// Items of the catalogHome photo lists are named "photo" in the schema.
const photoList = (images, prefix) =>
  images.map((image, i) => photo(image, `${prefix}-${i}`, "photo"));

const text = (type, [en, es]) => ({ _type: type, en, es });
const attributeType = (type, name) =>
  schemaTypes.get(type).attributes[name]?.value?.name;
const isBlank = (value) =>
  value === undefined ||
  value === null ||
  (Array.isArray(value) && !value.length) ||
  (typeof value === "object" &&
    !Array.isArray(value) &&
    !Object.keys(value).some((k) => !k.startsWith("_")));

// Fills each blank field of one document (creating it if missing) in one
// transaction, and checks the result against the schema.
function fillStep(current, id, type, values, label) {
  const missing = Object.entries(values).filter(
    ([path, value]) =>
      value !== undefined &&
      isBlank(path.split(".").reduce((v, k) => v?.[k], current)),
  );
  const fill = Object.fromEntries(missing);
  const merged = structuredClone(current ?? { _id: id, _type: type });
  for (const [path, value] of missing) {
    const keys = path.split(".");
    const last = keys.pop();
    keys.reduce((v, k) => (v[k] ??= {}), merged)[last] = value;
  }
  checkAgainstSchema(merged);
  const photos = missing
    .filter(([, v]) => v?._type === "image" || v?.[0]?._type === "image")
    .map(
      ([path, v]) =>
        `${path}: ${[v]
          .flat()
          .map((i) => i.asset._ref.split("-")[1].slice(0, 8))
          .join(", ")}`,
    );
  step(
    5,
    `Fill ${label}`,
    missing.length
      ? [
          { createIfNotExists: { _id: id, _type: type } },
          // Parents first (e.g. copy, seo), so nested fields have a place.
          ...[...new Set(missing.map(([p]) => p.split(".")[0]))]
            .filter((top) => missing.some(([p]) => p.startsWith(`${top}.`)))
            .map((top) => ({ patch: { id, setIfMissing: { [top]: {} } } })),
          { patch: { id, setIfMissing: fill } },
        ]
      : [],
    [`${missing.length} blank field(s) filled`, ...photos],
  );
}

async function fillPhase() {
  const { ui, homeCopy } = siteDefaults();
  const ids = [
    ...CATALOG_SINGLETONS,
    "pageSeo-proposals",
    "pageSeo-romantic-dinners",
  ];
  const drafts = await client.fetch(`*[_id in $ids]._id`, {
    ids: ids.flatMap((id) => [`drafts.${id}`]),
  });
  for (const id of drafts)
    problems.push(`${id} exists: publish or discard it in the Studio first`);
  const docs = Object.fromEntries(
    (await client.fetch(`*[_id in $ids]`, { ids })).map((d) => [d._id, d]),
  );

  // Catalog Settings: every text field the site shows, plus the deposit.
  const settingsFields = Object.keys(
    schemaTypes.get("experienceCatalogSettings").attributes,
  ).filter((k) => !k.startsWith("_") && ui[k] && !UNUSED_SETTINGS.includes(k));
  fillStep(
    docs.experienceCatalogSettings,
    "experienceCatalogSettings",
    "experienceCatalogSettings",
    {
      dinnerDepositAmount: 200,
      ...Object.fromEntries(
        settingsFields.map((k) => [
          k,
          text(attributeType("experienceCatalogSettings", k), ui[k]),
        ]),
      ),
    },
    "Catalog Settings",
  );

  // Catalog Home: the texts, and the proposals and photos the site picks
  // when these fields are empty (ExperienceHome.tsx, Catalog.tsx).
  const home = docs.catalogHome;
  const featuredIds = home?.featuredProposals?.length
    ? home.featuredProposals.map((r) => r._ref)
    : await client.fetch(
        `*[_type == "proposalExperience" && active == true
           && slug.current in $slugs] | order(name.en asc)[0...3]._id`,
        { slugs: FEATURED_FALLBACK_SLUGS },
      );
  const featuredDocs = await client.fetch(
    `*[_id in $ids && active == true]{_id, styles, gallery}`,
    { ids: featuredIds },
  );
  const featured = featuredIds
    .map((id) => featuredDocs.find((d) => d._id === id))
    .filter(Boolean);
  const catalog = await client.fetch(
    `*[_type in ["proposalExperience", "romanticDinnerExperience"]
       && active == true] | order(displayOrder asc, _id asc)
       {_type, "slug": slug.current, gallery}`,
  );
  const dinner = await client.fetch(`*[_id == $id][0]{styles, gallery}`, {
    id: DINNER_TEMPLATE_ID,
  });
  const dinnerStyles = byOrder(dinner?.styles);
  const firstPhoto = (e) => byOrder(e?.gallery)[0]?.image;

  const proposalSelector =
    activeByOrder(featured[0]?.styles)[0]?.mainImage ?? firstPhoto(featured[0]);
  const dinnerSelector = dinnerStyles[0]?.mainImage ?? firstPhoto(dinner);
  const proposalHero =
    firstPhoto(
      catalog.find(
        (e) =>
          e._type === "proposalExperience" && e.slug === PROPOSALS_HERO_SLUG,
      ),
    ) ?? firstPhoto(catalog.find((e) => e._type === "proposalExperience"));
  const activeDinner = catalog.find(
    (e) => e._type === "romanticDinnerExperience",
  );
  const dinnerHero = activeDinner
    ? firstPhoto(activeDinner)
    : (dinnerStyles[1]?.mainImage ?? firstPhoto(dinner));
  const moments = home?.moments?.length
    ? home.moments
    : featured
        .flatMap((e) => byOrder(e.gallery).map((p) => p.image))
        .filter(hasPhoto)
        .filter(
          (p, i, all) =>
            all.findIndex((q) => q.asset._ref === p.asset._ref) === i,
        )
        .slice(0, 8);
  const picked = {
    proposalSelectorImage: proposalSelector,
    dinnerSelectorImage: dinnerSelector,
    proposalHeroImage: proposalHero,
    dinnerHeroImage: dinnerHero,
  };
  for (const [name, image] of Object.entries(picked))
    if (!hasPhoto(image)) problems.push(`No photo found for ${name}`);
  if (featured.length !== 3)
    problems.push(`Expected 3 featured proposals, found ${featured.length}`);

  // Repair list items written with the wrong _type (an earlier phase 5 run
  // wrote "image" instead of "photo"; the Studio can't show those items).
  const retype = Object.entries(arrayItemTypes("catalogHome")).flatMap(
    ([key, item]) =>
      (home?.[key] ?? [])
        .filter((member) => member._type !== item)
        .map((member) => [`${key}[_key=="${member._key}"]._type`, item]),
  );
  step(
    5,
    "Repair Catalog Home photo list items",
    retype.length
      ? [{ patch: { id: "catalogHome", set: Object.fromEntries(retype) } }]
      : [],
    [`${retype.length} item(s) retyped`],
  );
  if (home)
    for (const [path, item] of retype) {
      const [, key, itemKey] = path.match(/^(\w+)\[_key=="([^"]+)"\]/);
      home[key].find((m) => m._key === itemKey)._type = item;
    }

  fillStep(
    home,
    "catalogHome",
    "catalogHome",
    {
      ...Object.fromEntries(
        Object.entries(picked)
          .filter(([, image]) => hasPhoto(image))
          .map(([name, image]) => [name, photo(image)]),
      ),
      ...Object.fromEntries(
        Object.entries(homeCopy).map(([k, value]) => [
          `copy.${k}`,
          text("localizedText", value),
        ]),
      ),
      featuredProposals: featured.map((e) => ({
        _key: e._id,
        _type: "reference",
        _ref: e._id,
      })),
      moments: photoList(moments, "moment"),
      editorialImages: photoList(moments.slice(0, 3), "editorial"),
    },
    "Catalog Home",
  );

  // Catalog Contact: the heading the page falls back to.
  fillStep(
    docs.catalogContact,
    "catalogContact",
    "catalogContact",
    { heading: text("localizedText", ui.contactUsLabel) },
    "Catalog Contact",
  );

  // SEO titles of the two listing pages (the titles they use today).
  for (const [page, key] of [
    ["proposals", "proposalSectionTitle"],
    ["romantic-dinners", "dinnerSectionTitle"],
  ])
    fillStep(
      docs[`pageSeo-${page}`],
      `pageSeo-${page}`,
      "pageSeo",
      {
        seo: {
          _type: "seo",
          meta: { en: { title: ui[key][0] }, es: { title: ui[key][1] } },
        },
      },
      `SEO: ${page}`,
    );
}

// --- Run ---------------------------------------------------------------------

if (phases.has(1)) await adventurePhase();
if (phases.has(2)) await catalogPhase();
if (phases.has(3)) await renamePhase();
if (phases.has(4)) await deletePhase();
if (phases.has(5)) await fillPhase();

mkdirSync("work", { recursive: true });
const outFile = `work/studio-migration-${dataset}.json`;
writeFileSync(outFile, JSON.stringify(plan, null, 2));
console.log(`\nPlan saved to ${outFile}.`);

if (problems.length) {
  console.log(`\n${problems.length} problem(s); nothing written:`);
  for (const problem of problems) console.log(`  - ${problem}`);
  process.exit(1);
}
if (!apply) {
  console.log("Dry run: nothing written. Re-run with --apply to write.");
  process.exit(0);
}

// Each step is one transaction: it applies completely or not at all.
for (const { phase, title, mutations } of plan.steps) {
  if (!mutations.length) continue;
  await client.mutate(mutations, { visibility: "sync" });
  console.log(`applied phase ${phase}: ${title} (${mutations.length})`);
}
console.log(`Done on "${dataset}".`);
