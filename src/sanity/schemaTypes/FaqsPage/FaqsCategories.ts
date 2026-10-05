import { defineField, defineType } from "sanity";
import { DocumentIcon } from "@sanity/icons";

export default defineType({
  name: "faqCategory",
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
    // Categories are shared by every language's FAQs, so the label holds
    // each language side by side.
    defineField({
      name: "label",
      title: "Label",
      type: "localizedString",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "label.en",
    },
  },
});
