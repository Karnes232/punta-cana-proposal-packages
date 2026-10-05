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
//   8. Writes the French and Portuguese content: a <id>-fr / <id>-pt copy of
//      every English page document with its text translated (catalog settings
//      and home take the built-in default texts), linked in the translation
//      metadata, and the fr/pt text of shared documents (packages, dinner,
//      menu, categories…). Translations come from work/translations/out/*.json.
//      Only creates documents and fills fields that don't exist yet.
//   9. Content fixes approved by the owner (work/translations/out/
//      content-fixes.json): Spanish typos and captions, story SEO in every
//      language, Spanish keywords. Each field changes only if it still holds
//      the exact old value, so later Studio edits are kept.
//  10. Home page texts move from the `copy` object to top-level fields, so the
//      Studio can show each home section's photos and texts together.
import { spawnSync } from "node:child_process";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { createRequire } from "node:module";
import { resolve } from "node:path";
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

// --- French and Portuguese ---------------------------------------------------------

const TARGET_LANGUAGES = ["fr", "pt"];
const TRANSLATIONS = "work/translations/out";
const readTranslations = (names) =>
  Object.assign(
    {},
    ...names.map((name) => {
      const file = `${TRANSLATIONS}/${name}.json`;
      if (!existsSync(file)) {
        problems.push(`Missing ${file}`);
        return {};
      }
      return JSON.parse(readFileSync(file, "utf8"));
    }),
  );

// The site's default texts, compiled from the TypeScript files it uses, so
// the catalog settings and home documents match the code's fallbacks.
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

// Path segments like `body[_key=="a1"].children[_key=="b2"].text` or `steps[0]`.
const segments = (path) =>
  path.split(/\.(?![^[]*\])/).flatMap((part) => {
    const m = part.match(/^([^[]+)((?:\[[^\]]+\])*)$/);
    const keys = [...(m?.[2] ?? "").matchAll(/\[([^\]]+)\]/g)].map((x) => x[1]);
    return [m ? m[1] : part, ...keys.map((k) => ({ selector: k }))];
  });

function setAtPath(target, path, value) {
  let node = target;
  const parts = segments(path);
  parts.forEach((part, i) => {
    const last = i === parts.length - 1;
    let next;
    if (typeof part === "string") {
      if (last) return (node[part] = value);
      next = node?.[part];
    } else {
      const key = part.selector.match(/^_key=="(.+)"$/)?.[1];
      const index = key
        ? node?.findIndex?.((item) => item?._key === key)
        : Number(part.selector);
      if (last) return (node[index] = value);
      next = node?.[index];
    }
    if (next === undefined) throw Error(`No ${path} to translate`);
    node = next;
  });
}

const DEFAULT_BUILT = new Set(["experienceCatalogSettings", "catalogHome"]);

function translatedCopy(english, language, text, defaults) {
  const base = english._id.replace(/-en$/, "");
  const copy = structuredClone(withoutSystemFields(english));
  for (const field of SHARED_FIELDS[english._type] ?? []) delete copy[field];
  if (english._type === "experienceCatalogSettings") {
    for (const key of Object.keys(copy))
      if (
        typeof copy[key] === "string" &&
        !key.startsWith("_") &&
        key !== "language"
      ) {
        const value = defaults.ui[key]?.[language];
        if (value) copy[key] = value;
        else problems.push(`No ${language} default for setting ${key}`);
      }
  } else if (english._type === "catalogHome") {
    // Home texts are top-level fields (phase 10); older documents still
    // hold them in a `copy` object.
    const texts = copy.copy ?? copy;
    for (const key of Object.keys(defaults.homeCopy))
      if (typeof texts[key] === "string") {
        const value = defaults.homeCopy[key][language];
        if (value) texts[key] = value;
        else problems.push(`No ${language} default for home text ${key}`);
      }
  } else {
    for (const [path, value] of Object.entries(text ?? {}))
      try {
        setAtPath(copy, path, value[language]);
      } catch (error) {
        problems.push(`${base}: ${error.message}`);
      }
  }
  copy._id = languageDocumentId(base, language);
  copy.language = language;
  for (const field of SAME_LANGUAGE_REFS[english._type] ?? [])
    if (copy[field]?._ref)
      copy[field] = {
        ...copy[field],
        _ref: copy[field]._ref.replace(/-en$/, `-${language}`),
      };
  return copy;
}

async function translationPhase() {
  const documents = readTranslations(["pages", "stories", "legal"]);
  const fields = readTranslations(["packages-a", "packages-b"]);
  const defaults = siteDefaults();
  const types = [
    ...new Set(SINGLE_SOURCES.map((s) => s.type)),
    ...COLLECTION_TYPES,
  ];
  const english = await client.fetch(
    `*[_type in $types && language == "en" && !(_id in path("drafts.**"))]`,
    { types },
  );
  const copies = [];
  for (const doc of english) {
    const base = doc._id.replace(/-en$/, "");
    const text = documents[base]?.text;
    if (!text && !DEFAULT_BUILT.has(doc._type)) {
      // Documents without visitor-facing text (none expected) are skipped.
      problems.push(`${base}: no translation in ${TRANSLATIONS}`);
      continue;
    }
    for (const language of TARGET_LANGUAGES)
      copies.push(translatedCopy(doc, language, text, defaults));
  }
  copies.forEach(checkAgainstSchema);
  const existing = await exists(copies.map((d) => d._id));
  const toCreate = copies.filter((d) => !existing.has(d._id));

  // Link the new languages in each document's translation metadata.
  const metadata = await client.fetch(
    `*[_type == "translation.metadata" && _id in $ids]{_id, "languages": translations[]._key}`,
    { ids: english.map((d) => `translations-${d._id.replace(/-en$/, "")}`) },
  );
  const links = metadata.flatMap(({ _id, languages }) => {
    const base = _id.replace(/^translations-/, "");
    const missing = TARGET_LANGUAGES.filter((l) => !languages?.includes(l));
    return missing.length
      ? [
          {
            patch: {
              id: _id,
              insert: {
                after: "translations[-1]",
                items: missing.map((language) => ({
                  _key: language,
                  _type: "internationalizedArrayReferenceValue",
                  value: {
                    _type: "reference",
                    _ref: languageDocumentId(base, language),
                  },
                })),
              },
            },
          },
        ]
      : [];
  });

  // fr/pt text of shared documents, only where it's still blank.
  const sharedIds = Object.keys(fields);
  const present = await exists(sharedIds);
  const fills = sharedIds
    .filter((id) => present.has(id))
    .map((id) => ({
      patch: {
        id,
        setIfMissing: Object.fromEntries(
          Object.entries(fields[id].text).flatMap(([path, value]) =>
            TARGET_LANGUAGES.map((language) => [
              `${path}.${language}`,
              value[language],
            ]),
          ),
        ),
      },
    }));
  for (const id of sharedIds.filter((id) => !present.has(id)))
    problems.push(`${id}: shared document not found`);

  step(
    8,
    "Create the French and Portuguese page documents",
    toCreate.map((doc) => ({ createIfNotExists: doc })),
    [`${copies.length} documents (${existing.size} already exist)`],
  );
  step(8, "Link them in the translation metadata", links, [
    `${links.length} metadata documents gain fr/pt`,
  ]);
  // SEO keywords: copied from English by the first run; translated here
  // only while a document still holds the untouched English list.
  const keywords = readTranslations(["keywords"]);
  const seoDocs = await client.fetch(
    `*[_type in ["pageSeo", "story"] && language in $languages
       && !(_id in path("drafts.**"))]{
       _id, _rev, language, "keywords": seo.meta.keywords,
       "english": *[_id == string::split(^._id, "-" + ^.language)[0] + "-en"][0].seo.meta.keywords
     }`,
    { languages: TARGET_LANGUAGES },
  );
  const keywordPatches = seoDocs
    .filter(
      (d) =>
        d.keywords?.length &&
        JSON.stringify(d.keywords) === JSON.stringify(d.english),
    )
    .map((d) => ({
      patch: {
        id: d._id,
        ifRevisionID: d._rev,
        set: {
          "seo.meta.keywords": d.keywords.map((k) =>
            k === null ? k : (keywords[k]?.[d.language] ?? k),
          ),
        },
      },
    }));
  for (const d of seoDocs)
    for (const k of d.keywords ?? [])
      if (k !== null && !keywords[k])
        problems.push(`No keyword translation for "${k}" (${d._id})`);
  step(8, "Translate SEO keywords", keywordPatches, [
    `${keywordPatches.length} documents still had the English keywords`,
  ]);
  step(8, "Fill French and Portuguese text on shared documents", fills, [
    `${fills.length} documents, ${fills.reduce((n, f) => n + Object.keys(f.patch.setIfMissing).length, 0)} fields (only blank ones are written)`,
  ]);
}

// --- Content fixes -------------------------------------------------------------

function getAtPath(target, path) {
  let node = target;
  for (const part of segments(path)) {
    if (node === undefined || node === null) return undefined;
    if (typeof part === "string") node = node[part];
    else {
      const key = part.selector.match(/^_key=="(.+)"$/)?.[1];
      node = key
        ? node.find?.((item) => item?._key === key)
        : node[Number(part.selector)];
    }
  }
  return node;
}

async function contentFixPhase() {
  const fixes = readTranslations(["content-fixes"]);
  const list = Array.isArray(fixes) ? fixes : Object.values(fixes);
  const ids = [...new Set(list.map((f) => f.id))];
  const docs = Object.fromEntries(
    (await client.fetch(`*[_id in $ids]`, { ids })).map((d) => [d._id, d]),
  );
  const same = (a, b) =>
    JSON.stringify(a ?? null) === JSON.stringify(b ?? null);
  const sets = {};
  const notes = { applied: 0, done: 0, changed: [], missing: new Set() };
  for (const fix of list) {
    const doc = docs[fix.id];
    if (!doc) {
      notes.missing.add(fix.id);
      continue;
    }
    const current = getAtPath(doc, fix.path);
    if (same(current, fix.to)) notes.done++;
    else if (same(current, fix.from)) {
      (sets[fix.id] ??= {})[fix.path] = fix.to;
      notes.applied++;
    } else notes.changed.push(`${fix.id} ${fix.path}`);
  }
  step(
    9,
    "Content fixes",
    Object.entries(sets).map(([id, set]) => ({
      patch: { id, ifRevisionID: docs[id]._rev, set },
    })),
    [
      `${notes.applied} field(s) fixed, ${notes.done} already fixed`,
      ...(notes.changed.length
        ? [`left alone (edited since): ${notes.changed.join(", ")}`]
        : []),
      ...(notes.missing.size
        ? [`documents not found: ${[...notes.missing].join(", ")}`]
        : []),
    ],
  );
}

// --- Home texts as top-level fields ------------------------------------------

async function flattenHomePhase() {
  const ids = [...SOURCE_LANGUAGES, ...TARGET_LANGUAGES].map((language) =>
    languageDocumentId("catalogHome", language),
  );
  const drafts = await client.fetch(`*[_id in $ids]._id`, {
    ids: ids.map((id) => `drafts.${id}`),
  });
  for (const id of drafts)
    problems.push(`${id} exists: publish or discard it in the Studio first`);
  const docs = await client.fetch(`*[_id in $ids && defined(copy)]`, { ids });
  const patches = docs.map((doc) => {
    const set = Object.fromEntries(
      Object.entries(doc.copy).filter(
        ([key, value]) =>
          !key.startsWith("_") && doc[key] === undefined && value,
      ),
    );
    const flattened = { ...withoutSystemFields(doc), ...set };
    delete flattened.copy;
    checkAgainstSchema(flattened);
    return {
      patch: { id: doc._id, ifRevisionID: doc._rev, set, unset: ["copy"] },
    };
  });
  step(10, "Move the home page texts to top-level fields", patches, [
    `${patches.length} home documents (${ids.length - patches.length} already done)`,
  ]);
}

// --- Run ---------------------------------------------------------------------

if (phases.has(6)) await splitPhase();
if (phases.has(7)) await cleanupPhase();
if (phases.has(8)) await translationPhase();
if (phases.has(9)) await contentFixPhase();
if (phases.has(10)) await flattenHomePhase();

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
