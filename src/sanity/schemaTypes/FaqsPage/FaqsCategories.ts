import { defineField, defineType } from "sanity";
import { DocumentIcon } from "@sanity/icons";

export default defineType({
  name: "FaqsPageFaqsCategories",
  title: "Faqs Page Faqs Categories",
  type: "document",
  icon: DocumentIcon,
  fields: [
    defineField({
      name: "value",
      title: "Value",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "labelEn",
      title: "Label English",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "labelEs",
      title: "Label Spanish",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "labelEn",
    },
  },
});
