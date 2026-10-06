import { defineField, defineType } from "sanity";
import { languageField } from "../shared/languageField";
import { bi } from "../shared/labels";
import { pageSeo } from "../shared/pageSections";

export const legalDocuments = defineType({
  name: "legalDocument",
  title: "Legal Documents",
  type: "document",
  groups: [
    { name: "content", title: bi("Contenido", "Content"), default: true },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    languageField,
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      group: "content",
      of: [{ type: "block" }],
      validation: (Rule) => Rule.required().min(1),
    }),
    // Last, like the bottom of the page: this language's SEO.
    pageSeo(),
  ],
  preview: {
    select: { id: "_id" },
    prepare: ({ id }) => ({
      title: String(id ?? "").replace(/^(drafts\.)?legalDocument-/, ""),
    }),
  },
});
