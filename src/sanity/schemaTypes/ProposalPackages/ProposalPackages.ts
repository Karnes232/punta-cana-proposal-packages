import { defineField, defineType } from "sanity";

import { DocumentIcon } from "@sanity/icons";

export default defineType({
  name: "ProposalPackages",
  title: "Proposal Packages",
  type: "document",
  icon: DocumentIcon,
  groups: [
    {
      name: "page",
      title: "Page",
    },
    {
      name: "hero",
      title: "Hero",
    },
    {
      name: "intro",
      title: "Intro",
    },
    {
      name: "packages",
      title: "Packages",
    },
  ],
  fields: [
    defineField({
      name: "page",
      title: "Page",
      type: "string",
      group: "page",
      options: {
        list: [
          { title: "Classic Proposals", value: "classic-proposals" },
          { title: "Modern Proposals", value: "modern-proposals" },
          { title: "Dining Proposals", value: "dining-proposals" },
          { title: "Adventure Proposals", value: "adventure-proposals" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      fields: [
        defineField({
          name: "alt",
          title: "Alternative Text",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
      ],
      options: {
        hotspot: true,
      },
      group: "hero",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroEyebrow",
      title: "Hero Eyebrow",
      type: "localizedString",
      group: "hero",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroHeadingLine1",
      title: "Hero Heading Line 1",
      type: "localizedString",
      group: "hero",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroHeadingLine2",
      title: "Hero Heading Line 2",
      type: "localizedString",
      group: "hero",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroSubheading",
      title: "Hero Subheading",
      type: "localizedText",
      group: "hero",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "introEyebrow",
      title: "Intro Eyebrow",
      type: "localizedString",
      group: "intro",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "introHeadingLine1",
      title: "Intro Heading Line 1",
      type: "localizedString",
      group: "intro",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "introHeadingLine2",
      title: "Intro Heading Line 2",
      type: "localizedString",
      group: "intro",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "introDescription",
      title: "Intro Description",
      type: "localizedText",
      group: "intro",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "packages",
      title: "Packages",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "IndividualProposalPackage" }],
          options: { disableNew: true },
        },
      ],
      group: "packages",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "page",
      subtitle: "heroEyebrow.en",
    },
  },
});
