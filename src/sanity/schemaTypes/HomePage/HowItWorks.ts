import { defineField, defineType } from "sanity";
import { DocumentIcon } from "@sanity/icons";

export default defineType({
  name: "HomePageHowItWorks",
  title: "Home Page How It Works",
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
      name: "headingLine1",
      title: "Heading Line 1",
      type: "localizedString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "headingLine2",
      title: "Heading Line 2",
      type: "localizedString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "ctaLabel",
      title: "CTA Label",
      type: "localizedString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "ctaHref",
      title: "CTA Href",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "steps",
      title: "Steps",
      type: "array",
      of: [{ type: "HomePageHowItWorksStep" }],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "eyebrow.en",
      subtitle: "headingLine1.en",
    },
  },
});