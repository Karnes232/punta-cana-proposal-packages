import { defineField, defineType } from "sanity";

export const legalDocuments = defineType({
  name: "legalDocuments",
  title: "Legal Documents",
  type: "document",
  fields: [
    defineField({
      name: "pageName",
      title: "Page Name",
      type: "string",
      options: {
        list: [
          { title: "Privacy Policy", value: "privacy-policy" },
          { title: "Terms of Service", value: "terms-of-service" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "localizedBlock",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "pageName",
    },
  },
});
