import { defineField, defineType } from "sanity";
import { DocumentIcon } from "@sanity/icons";

export default defineType({
  name: "BlogPageCtaStrip",
  title: "Blog Page CTA Strip",
  type: "document",
  icon: DocumentIcon,
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "blogLocalizedString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "blogLocalizedString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "headingAccent",
      title: "Heading Accent",
      type: "blogLocalizedString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subheading",
      title: "Subheading",
      type: "blogLocalizedText",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "ctaLabel",
      title: "CTA Label",
      type: "blogLocalizedString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "ctaHref",
      title: "CTA Href",
      type: "string",
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
