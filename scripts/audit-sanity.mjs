import fs from "node:fs";
import { createClient } from "@sanity/client";
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const client = createClient({
  projectId,
  dataset,
  token: process.env.SANITY_API_READ_TOKEN,
  apiVersion: "2026-03-07",
  useCdn: false,
  perspective: process.env.SANITY_API_READ_TOKEN ? "raw" : "published",
});
const documents = await client.fetch("*[]");
fs.mkdirSync("work", { recursive: true });
const path = `work/sanity-${dataset}-${Date.now()}.ndjson`;
fs.writeFileSync(path, documents.map((d) => JSON.stringify(d)).join("\n"));
const counts = {};
for (const d of documents) counts[d._type] = (counts[d._type] || 0) + 1;
console.log(
  JSON.stringify(
    {
      path,
      scope: process.env.SANITY_API_READ_TOKEN
        ? "raw documents including drafts"
        : "published documents only",
      counts,
      assets:
        "Metadata and references only; export/download assets separately before destructive migration",
    },
    null,
    2,
  ),
);
