import { defineField, defineType } from "sanity";
import { DocumentIcon } from "@sanity/icons";

export default defineType({
  name: "BlogPageHero",
  title: "Blog Page Hero",
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
      name: "headingLine1",
      title: "Heading Line 1",
      type: "blogLocalizedString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "headingLine2",
      title: "Heading Line 2",
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
      name: "image",
      title: "Image",
      type: "image",
      description: "The image is optional",
      fields: [
        defineField({
          name: "alt",
          title: "Alternative Text",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: "featuredPost",
      title: "Featured Post",
      type: "reference",
      to: [{ type: "blogPost" }],
      options: { disableNew: true },
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
