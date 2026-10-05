import { defineField, defineType } from "sanity";

export const legalDocuments = defineType({
  name: "legalDocument",
  title: "Legal Documents",
  type: "document",
  fields: [
    defineField({
      name: "content",
      title: "Content",
      type: "localizedBlock",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { id: "_id" },
    prepare: ({ id }) => ({
      title: String(id ?? "").replace(/^(drafts\.)?legalDocument-/, ""),
    }),
  },
});
