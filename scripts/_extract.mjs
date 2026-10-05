// TEMPORARY (not committed): extracts English source text for translation.
import { writeFileSync } from "node:fs";
import { createClient } from "@sanity/client";
const c = createClient({ projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, dataset: "migration-test", token: process.env.SANITY_API_WRITE_TOKEN, apiVersion: "2026-03-07", useCdn: false, perspective: "published" });
const SKIP = new Set(["_id","_type","_key","_ref","_rev","_createdAt","_updatedAt","language","slug","current","asset","url","value","id","date","names","ctaHref","primaryCTAHref","secondaryCTAHref","style","listItem","markDefs","marks","href","level","icon","courseType","dietaryType","dietaryTags","pricingType","applicableTo","type","currency","internalTitle","internalNotes","companyName","email","telephone","whatsapp","socialLinks","keywords"]);
// per-language docs: path -> text (portable text spans and plain strings)
function leaves(v, path, out) {
  if (Array.isArray(v)) { v.forEach((x, i) => leaves(x, `${path}[${x?._key ? `_key=="${x._key}"` : i}]`, out)); return out; }
  if (v && typeof v === "object") { for (const [k, x] of Object.entries(v)) if (!SKIP.has(k) && !k.startsWith("_")) leaves(x, path ? `${path}.${k}` : k, out); return out; }
  if (typeof v === "string" && v.trim() && !/^https?:\/\//.test(v) && !/^\/[\w/#-]*$/.test(v)) out[path] = v;
  return out;
}
// shared docs: path-to-localized-object -> english text
function localized(v, path, out) {
  if (Array.isArray(v)) { v.forEach((x, i) => localized(x, `${path}[${x?._key ? `_key=="${x._key}"` : i}]`, out)); return out; }
  if (v && typeof v === "object") {
    const keys = Object.keys(v).filter((k) => !k.startsWith("_"));
    if (keys.length && keys.every((k) => ["en","es","fr","pt","de","it","zh","ru","ar"].includes(k))) { if (typeof v.en === "string" && v.en.trim() && !v.fr) out[path] = { en: v.en, es: v.es ?? "" }; return out; }
    for (const [k, x] of Object.entries(v)) if (!k.startsWith("_")) localized(x, path ? `${path}.${k}` : k, out);
  }
  return out;
}
const perLang = await c.fetch(`*[language in ["en", "es"] && _type in ["catalogContact","storiesHero","storiesCtaStrip","faqHero","faqContactStrip","howItWorksHero","howItWorksSteps","howItWorksFaq","howItWorksCta","pageSeo","legalDocument","story","faq"]]`);
const docs = {};
for (const d of perLang.filter((x) => x.language === "en")) {
  const base = d._id.replace(/-en$/, "");
  const es = leaves(perLang.find((x) => x._id === `${base}-es`) ?? {}, "", {});
  const t = Object.fromEntries(Object.entries(leaves(d, "", {})).map(([p, en]) => [p, { en, es: es[p] ?? "" }]));
  if (Object.keys(t).length) docs[base] = { type: d._type, text: t };
}
const shared = await c.fetch(`*[(_type in ["proposalExperience","romanticDinnerExperience","experienceAddon","menuItem","beverageOption","dinnerOccasion","storyType","faqCategory","howItWorksFaqCategory","generalLayout"]) || _id == "catalogHome-en"]`);
const fields = {};
for (const d of shared) { const t = localized(d, "", {}); if (Object.keys(t).length) fields[d._id] = { type: d._type, text: t }; }
writeFileSync("work/translations/source-documents.json", JSON.stringify(docs, null, 2));
writeFileSync("work/translations/source-fields.json", JSON.stringify(fields, null, 2));
const count = (o) => Object.values(o).reduce((n, d) => n + Object.keys(d.text).length, 0);
const words = (o) => Object.values(o).reduce((n, d) => n + Object.values(d.text).map((t) => t.en).join(" ").split(/\s+/).length, 0);
console.log({ perLanguageDocs: Object.keys(docs).length, docStrings: count(docs), docWords: words(docs), sharedDocs: Object.keys(fields).length, fieldStrings: count(fields), fieldWords: words(fields) });
