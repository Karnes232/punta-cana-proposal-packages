import { defineField, defineType } from "sanity";
import { languageField } from "../shared/languageField";

export const legalDocuments = defineType({
  name: "legalDocument",
  title: "Legal Documents",
  type: "document",
  fields: [
    languageField,
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [{ type: "block" }],
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
