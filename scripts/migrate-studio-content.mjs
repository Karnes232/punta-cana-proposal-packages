// Studio content migrations, run in phases with a dry run by default.
//
// Dry run (writes nothing, saves the plan to work/):
//   node --env-file=.env.local scripts/migrate-studio-content.mjs --dataset migration-test --phases 6
// Apply:
//   node --env-file=.env.local scripts/migrate-studio-content.mjs --dataset production --phases 6 --apply
//
// Phases 1-5 (Studio step 2: renamed types, legacy clean-up, catalog fill)
// ran on production on 2026-10-05; see this file's git history.
//
// Per-language documents (French and Portuguese, with
// @sanity/document-internationalization):
//   6. Splits every two-language page document (catalog settings, home and
//      contact, page sections, page SEO, legal pages, stories, FAQs) into an
//      English and a Spanish document (<id>-en, <id>-es) linked by a
//      translation.metadata document, and gives FAQ categories a label in
//      every language. The originals stay, so the live site keeps working.
//      Shared fields (home photos, featured proposals, the dinner deposit)
//      go on the English document only. Only creates what doesn't exist yet.
//   7. Once the new code is live: deletes the originals and the old FAQ
//      category label fields. It refuses while a copy is missing or anything
//      else still references what it deletes.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { createClient } from "@sanity/client";

const args = process.argv.slice(2);
const flag = (name) => args.includes(name);
const option = (name) => {
  const i = args.indexOf(name);
  return i === -1 ? undefined : args[i + 1];
};

const apply = flag("--apply");
if (!option("--phases")) throw Error("Pass --phases (e.g. --phases 6)");
const phases = new Set(option("--phases").split(",").map(Number));
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
const LEGAL_PAGES = ["privacy-policy", "terms-of-service"];
const CATALOG_SINGLETONS = [
  "experienceCatalogSettings",
  "catalogHome",
  "catalogContact",
];
// Page sections that became per-language (the blog's stay in 9 languages).
const PAGE_SECTIONS = [
  "storiesHero",
  "storiesCtaStrip",
  "faqHero",
  "faqContactStrip",
  "howItWorksHero",
  "howItWorksSteps",
  "howItWorksFaq",
  "howItWorksCta",
];
const languageDocumentId = (base, language) => `${base}-${language}`;

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

const withoutSystemFields = (doc) => {
  const copy = { ...doc };
  for (const key of ["_rev", "_createdAt", "_updatedAt", "_system"])
    delete copy[key];
  return copy;
};

// --- Per-language documents -----------------------------------------------------

// Documents with one fixed ID that become one document per language.
const SINGLE_SOURCES = [
  ...CATALOG_SINGLETONS.map((id) => ({ id, type: id })),
  ...PAGE_SECTIONS.map((id) => ({ id, type: id })),
  ...SEO_PAGES.map((page) => ({ id: `pageSeo-${page}`, type: "pageSeo" })),
  ...LEGAL_PAGES.map((page) => ({
    id: `legalDocument-${page}`,
    type: "legalDocument",
  })),
];
// Collections whose two-language documents become one per language.
const COLLECTION_TYPES = ["story", "faq"];
// The languages the two-language documents hold.
const SOURCE_LANGUAGES = ["en", "es"];
// Fields shared by every language: kept on the English document only.
const SHARED_FIELDS = {
  experienceCatalogSettings: ["dinnerDepositAmount"],
  catalogHome: [
    "heroImage",
    "proposalHeroImage",
    "dinnerHeroImage",
    "proposalSelectorImage",
    "dinnerSelectorImage",
    "featuredProposals",
    "journeyImages",
    "editorialImages",
    "moments",
  ],
};
// References that point at another per-language document: each language's
// copy points at the same language's copy.
const SAME_LANGUAGE_REFS = { storiesHero: ["featuredStory"] };

const LOCALE_KEYS = new Set(["en", "es", "fr", "pt"]);
// A field-level translation: { en, es, … } (with an optional _type).
const isLocalized = (value) =>
  value &&
  typeof value === "object" &&
  !Array.isArray(value) &&
  Object.keys(value).some((k) => LOCALE_KEYS.has(k)) &&
  Object.keys(value).every((k) => LOCALE_KEYS.has(k) || k === "_type");

const compact = (object) =>
  Object.fromEntries(
    Object.entries(object).filter(([, v]) => v !== undefined && v !== null),
  );

// The two-language `seo` object becomes the single-language blogPostSeo.
const seoInLanguage = (seo, language) => {
  const meta = seo.meta?.[language] ?? {};
  const og = seo.openGraph?.[language] ?? {};
  return compact({
    _type: "blogPostSeo",
    meta: compact({
      title: meta.title,
      description: meta.description,
      keywords: meta.keywords,
    }),
    openGraph: compact({ title: og.title, description: og.description }),
    image: seo.openGraph?.image?.asset ? seo.openGraph.image : undefined,
    structuredData: seo.structuredData?.[language],
    noIndex: seo.noIndex,
    noFollow: seo.noFollow,
  });
};

// One language's version of a value: every { en, es } becomes its `language`
// text, recursively.
function inLanguage(value, language) {
  if (Array.isArray(value)) return value.map((v) => inLanguage(v, language));
  if (!value || typeof value !== "object") return value;
  if (value._type === "seo") return seoInLanguage(value, language);
  if (isLocalized(value)) return value[language];
  return compact(
    Object.fromEntries(
      Object.entries(value).map(([k, v]) => [k, inLanguage(v, language)]),
    ),
  );
}

function languageCopy(source, language) {
  const shared = SHARED_FIELDS[source._type] ?? [];
  const body = withoutSystemFields(source);
  for (const field of shared) delete body[field];
  const copy = {
    ...inLanguage(body, language),
    _id: languageDocumentId(source._id, language),
    _type: source._type,
    language,
  };
  if (language === "en")
    for (const field of shared)
      if (source[field] !== undefined) copy[field] = source[field];
  for (const field of SAME_LANGUAGE_REFS[source._type] ?? [])
    if (copy[field]?._ref)
      copy[field] = {
        ...copy[field],
        _ref: languageDocumentId(copy[field]._ref, language),
      };
  return copy;
}

const translationMetadata = (source) => ({
  _id: `translations-${source._id}`,
  _type: "translation.metadata",
  schemaTypes: [source._type],
  translations: SOURCE_LANGUAGES.map((language) => ({
    _key: language,
    _type: "internationalizedArrayReferenceValue",
    value: {
      _type: "reference",
      _ref: languageDocumentId(source._id, language),
    },
  })),
});

async function sourceDocuments() {
  const singles = await client.fetch(`*[_id in $ids]`, {
    ids: SINGLE_SOURCES.map((s) => s.id),
  });
  const collections = await client.fetch(
    `*[_type in $types && !defined(language) && !(_id in path("drafts.**"))]`,
    { types: COLLECTION_TYPES },
  );
  const drafts = await client.fetch(
    `*[_id in path("drafts.**") && (_id in $ids || (_type in $types && !defined(language)))]._id`,
    {
      ids: SINGLE_SOURCES.map((s) => `drafts.${s.id}`),
      types: COLLECTION_TYPES,
    },
  );
  for (const id of drafts)
    problems.push(`${id} exists: publish or discard it in the Studio first`);
  const missing = SINGLE_SOURCES.filter(
    (s) => !singles.some((d) => d._id === s.id),
  );
  return { sources: [...singles, ...collections], missing };
}

async function splitPhase() {
  const { sources, missing } = await sourceDocuments();
  const copies = sources.flatMap((source) =>
    SOURCE_LANGUAGES.map((language) => languageCopy(source, language)),
  );
  copies.forEach(checkAgainstSchema);
  const metadata = sources.map(translationMetadata);
  const existing = await exists([
    ...copies.map((d) => d._id),
    ...metadata.map((d) => d._id),
  ]);
  const toCreate = [...copies, ...metadata].filter((d) => !existing.has(d._id));

  const categories = await client.fetch(
    `*[_type == "faqCategory" && !defined(label)]{_id, labelEn, labelEs}`,
  );
  const labels = categories.map((c) => ({
    patch: {
      id: c._id,
      setIfMissing: {
        label: { _type: "localizedString", en: c.labelEn, es: c.labelEs },
      },
    },
  }));

  const byType = {};
  for (const d of copies) byType[d._type] = (byType[d._type] ?? 0) + 1;
  step(
    6,
    "Split two-language documents into English and Spanish documents",
    [...toCreate.map((doc) => ({ createIfNotExists: doc })), ...labels],
    [
      `${sources.length} two-language documents → ${copies.length} per-language documents (${Object.entries(
        byType,
      )
        .map(([type, n]) => `${type} ${n}`)
        .join(", ")})`,
      `${metadata.length} translation.metadata documents`,
      `${existing.size} already exist (left as they are)`,
      `${labels.length} FAQ categories get a localized label`,
      ...missing.map((s) => `${s.id} doesn't exist (nothing to split)`),
    ],
  );
}

async function cleanupPhase() {
  const { sources } = await sourceDocuments();
  const expected = sources.flatMap((source) =>
    SOURCE_LANGUAGES.map((language) =>
      languageDocumentId(source._id, language),
    ),
  );
  const present = await exists(expected);
  const missing = expected.filter((id) => !present.has(id));
  if (missing.length)
    problems.push(`Copies missing (run phase 6 first): ${missing.join(", ")}`);

  const ids = sources.map((s) => s._id);
  const blockers = await client.fetch(
    `*[references($ids) && !(_id in $ids)]{_id, _type}`,
    { ids },
  );
  for (const doc of blockers)
    problems.push(`${doc._id} (${doc._type}) still references an original`);

  const unlabeled = await client.fetch(
    `count(*[_type == "faqCategory" && !defined(label)])`,
  );
  if (unlabeled)
    problems.push(`${unlabeled} FAQ categories have no label (run phase 6)`);
  const oldLabels = await client.fetch(
    `*[_type == "faqCategory" && (defined(labelEn) || defined(labelEs))]._id`,
  );

  step(
    7,
    "Delete the two-language originals",
    [
      ...ids.map((id) => ({ delete: { id } })),
      ...oldLabels.map((id) => ({
        patch: { id, unset: ["labelEn", "labelEs"] },
      })),
    ],
    [
      `${ids.length} originals deleted`,
      `${oldLabels.length} FAQ categories lose labelEn/labelEs`,
    ],
  );
}

// --- Run ---------------------------------------------------------------------

if (phases.has(6)) await splitPhase();
if (phases.has(7)) await cleanupPhase();

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
