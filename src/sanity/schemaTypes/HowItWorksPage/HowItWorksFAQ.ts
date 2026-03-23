import { defineType, defineField, validation } from "sanity";
import { DocumentIcon } from "@sanity/icons";
export default defineType({
  name: "HowItWorksPageHowItWorksFAQ",
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
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "localizedString",
      validation: (Rule) => Rule.required(),
      group: "content",
    }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "localizedString",
      validation: (Rule) => Rule.required(),
      group: "content",
    }),
    defineField({
      name: "headingAccent",
      title: "Heading Accent",
      type: "localizedString",
      validation: (Rule) => Rule.required(),
      group: "content",
    }),
    defineField({
      name: "subheading",
      title: "Subheading",
      type: "localizedText",
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
              to: [{ type: "HowItWorksPageHowItWorksFaqCategory" }],
              validation: (Rule) => Rule.required(),
              options: {
                disableNew: true,
              },
            }),
            defineField({
              name: "question",
              title: "Question",
              type: "localizedString",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "answer",
              title: "Answer",
              type: "localizedText",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: "question.en",
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
      title: "eyebrow.en",
      subtitle: "heading.en",
    },
  },
});
