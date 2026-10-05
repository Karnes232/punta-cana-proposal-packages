import { defineField, defineType } from "sanity";
import { languageField } from "../shared/languageField";

/** One page's SEO in one language (pageSeo-<page>-<language>). */
export default defineType({
  name: "pageSeo",
  title: "Page SEO",
  type: "document",
  fields: [languageField, defineField({ name: "seo", type: "blogPostSeo" })],
  preview: {
    select: { id: "_id", metaTitle: "seo.meta.title" },
    prepare: ({ id, metaTitle }) => ({
      title: `SEO: ${String(id ?? "").replace(/^(drafts\.)?pageSeo-/, "")}`,
      subtitle: metaTitle,
    }),
  },
});
