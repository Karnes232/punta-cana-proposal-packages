import { defineField, defineType } from "sanity";
import { DocumentIcon } from "@sanity/icons";

export default defineType({
  name: "FaqsPageFaqContactStrip",
  title: "Faqs Page Faq Contact Strip",
  type: "document",
  icon: DocumentIcon,
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "localizedString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "line1",
      title: "Line 1",
      type: "localizedString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "line2",
      title: "Line 2",
      type: "localizedString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "localizedText",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "cta",
      title: "CTA",
      type: "localizedString",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "eyebrow.en",
      subtitle: "line1.en",
    },
  },
});
