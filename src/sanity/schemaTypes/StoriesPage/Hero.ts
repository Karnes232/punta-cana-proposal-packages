import { defineField, defineType } from "sanity";
import { languageField } from "../shared/languageField";
import { DocumentIcon } from "@sanity/icons";

export default defineType({
  name: "storiesHero",
  title: "Stories Page Hero",
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
      name: "headingLine1",
      title: "Heading Line 1",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "headingLine2",
      title: "Heading Line 2",
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
      to: [{ type: "story" }],
      options: { disableNew: true },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "eyebrow",
      subtitle: "headingLine1",
    },
  },
});
