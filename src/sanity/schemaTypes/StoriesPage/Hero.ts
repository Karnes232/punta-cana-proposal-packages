import { defineField, defineType } from "sanity";
import { DocumentIcon } from "@sanity/icons";

export default defineType({
  name: "StoriesPageHero",
  title: "Stories Page Hero",
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
      name: "subheading",
      title: "Subheading",
      type: "localizedText",
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
      name: "featuredStory",
      title: "Featured Story",
      type: "reference",
      to: [{ type: "individualStory" }],
      options: { disableNew: true },
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
