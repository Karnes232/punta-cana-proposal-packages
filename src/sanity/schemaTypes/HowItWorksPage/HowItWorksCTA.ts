import { defineField, defineType } from "sanity";
import { DocumentIcon } from "@sanity/icons";
export default defineType({
  name: "HowItWorksPageHowItWorksCTA",
  title: "How It Works Page CTA",
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
      name: "scriptLine",
      title: "Script Line",
      type: "localizedString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "localizedString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "headingAccent",
      title: "Heading Accent",
      type: "localizedString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subheading",
      title: "Subheading",
      type: "localizedText",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "primaryCTA",
      title: "Primary CTA",
      type: "localizedString",
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
      type: "localizedString",
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
      title: "eyebrow.en",
      subtitle: "heading.en",
    },
  },
});
