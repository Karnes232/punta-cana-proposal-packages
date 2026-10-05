import { defineField, defineType } from "sanity";
import { languageField } from "../shared/languageField";
import { DocumentIcon } from "@sanity/icons";
export default defineType({
  name: "howItWorksCta",
  title: "How It Works Page CTA",
  type: "document",
  icon: DocumentIcon,
  fields: [
    languageField,
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "scriptLine",
      title: "Script Line",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "headingAccent",
      title: "Heading Accent",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subheading",
      title: "Subheading",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "primaryCTA",
      title: "Primary CTA",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "primaryCTAHref",
      title: "Primary CTA Href",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "secondaryCTA",
      title: "Secondary CTA",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "secondaryCTAHref",
      title: "Secondary CTA Href",
      type: "string",
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
