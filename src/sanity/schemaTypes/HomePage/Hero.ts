import { defineField, defineType } from "sanity";

export default defineType({
  name: "HomePageHero",
  title: "Home Page Hero",
  type: "document",
  description: "Optional",
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      fields: [
        defineField({
          name: "alt",
          title: "Alternative Text",
          type: "string",
          description: "Important for SEO and accessibility",
        }),
      ],
    }),
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
      name: "headingLine3",
      title: "Heading Line 3",
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
      name: "primaryLabel",
      title: "Primary Label",
      type: "localizedString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "primaryHref",
      title: "Primary Href",
      type: "string",
    }),
    defineField({
      name: "secondaryLabel",
      title: "Secondary Label",
      type: "localizedString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "secondaryHref",
      title: "Secondary Href",
      type: "string",
    }),
  ],
  preview: {
    select: {
      title: "headingLine1.en",
      subtitle: "headingLine2.en",
    },
  },
});
