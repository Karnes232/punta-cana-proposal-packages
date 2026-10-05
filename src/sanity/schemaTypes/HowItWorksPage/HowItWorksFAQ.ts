import { defineType, defineField } from "sanity";
import { languageField } from "../shared/languageField";
import { DocumentIcon } from "@sanity/icons";
export default defineType({
  name: "howItWorksFaq",
  title: "How It Works Page FAQ",
  type: "document",
  icon: DocumentIcon,
  groups: [
    {
      name: "content",
      title: "Content",
    },
    {
      name: "faq",
      title: "FAQ",
    },
  ],
  fields: [
    languageField,
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      validation: (Rule) => Rule.required(),
      group: "content",
    }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (Rule) => Rule.required(),
      group: "content",
    }),
    defineField({
      name: "headingAccent",
      title: "Heading Accent",
      type: "string",
      validation: (Rule) => Rule.required(),
      group: "content",
    }),
    defineField({
      name: "subheading",
      title: "Subheading",
      type: "text",
      validation: (Rule) => Rule.required(),
      group: "content",
    }),
    defineField({
      name: "faqs",
      title: "FAQs",
      type: "array",
      group: "faq",
      of: [
        {
          name: "faq",
          title: "FAQ",
          type: "object",
          fields: [
            defineField({
              name: "category",
              title: "Category",
              type: "reference",
              to: [{ type: "howItWorksFaqCategory" }],
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
              subtitle: "category.name.en",
            },
          },
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "eyebrow",
      subtitle: "heading",
    },
  },
});
