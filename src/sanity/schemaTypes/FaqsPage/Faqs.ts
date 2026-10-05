import { defineField, defineType } from "sanity";
import { languageField } from "../shared/languageField";
import { DocumentIcon } from "@sanity/icons";

export default defineType({
  name: "faq",
  title: "Faqs Page Faqs",
  type: "document",
  icon: DocumentIcon,
  fields: [
    languageField,
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "faqCategory" }],
      validation: (Rule) => Rule.required(),
      options: {
        disableNew: true,
      },
    }),
    defineField({
      name: "question",
      title: "Question",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "answer",
      title: "Answer",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "question",
      subtitle: "category.label.en",
    },
  },
});
