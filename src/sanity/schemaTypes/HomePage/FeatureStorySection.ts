import { defineField, defineType } from "sanity";
import { DocumentIcon } from "@sanity/icons";

export default defineType({
  name: "HomePageFeatureStorySection",
  title: "Home Page Feature Story Section",
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
      name: "heading",
      title: "Heading",
      type: "localizedString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "stories",
      title: "Stories",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "HomePageFeatureStory" }],
          options: { disableNew: true },
        },
      ],
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
