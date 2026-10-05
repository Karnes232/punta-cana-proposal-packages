import { defineField, defineType } from "sanity";

export default defineType({
  name: "pageSeo",
  title: "Page SEO",
  type: "document",
  fields: [defineField({ name: "seo", type: "seo" })],
  preview: {
    select: { id: "_id", metaTitle: "seo.meta.es.title" },
    prepare: ({ id, metaTitle }) => ({
      title: `SEO: ${String(id ?? "").replace(/^(drafts\.)?pageSeo-/, "")}`,
      subtitle: metaTitle,
    }),
  },
});
