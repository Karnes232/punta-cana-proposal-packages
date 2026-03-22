import { defineField, defineType } from "sanity";
import { DocumentIcon } from "@sanity/icons";

export default defineType({
  name: "HowItWorksPageHowItWorksSteps",
  title: "How It Works Page How It Works Steps",
  type: "document",
  icon: DocumentIcon,
  groups: [
    {
      name: "steps",
      title: "Steps",
    },
    {
      name: "reassurance",
      title: "Reassurance",
    },
  ],
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "localizedString",
      validation: (Rule) => Rule.required(),
      group: "steps",
    }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "localizedString",
      validation: (Rule) => Rule.required(),
      group: "steps",
    }),
    defineField({
      name: "headingAccent",
      title: "Heading Accent",
      type: "localizedString",
      validation: (Rule) => Rule.required(),
      group: "steps",
    }),
    defineField({
      name: "subheading",
      title: "Subheading",
      type: "localizedText",
      validation: (Rule) => Rule.required(),
      group: "steps",
    }),
    defineField({
      name: "steps",
      title: "Steps",
      type: "array",
      group: "steps",
      of: [
        {
          name: "step",
          title: "Step",
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "localizedString",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "title",
              title: "Title",
              type: "localizedString",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "localizedText",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: "label.en",
              subtitle: "title.en",
            },
          },
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "reassurance",
      title: "Reassurance",
      type: "array",
      group: "reassurance",
      of: [
        {
          name: "reassuranceItem",
          title: "Reassurance Item",
          type: "object",
          fields: [
            defineField({
              name: "id",
              title: "ID",
              type: "string",
              options: {
                list: ["private", "team", "inclusive", "memories"],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "title",
              title: "Title",
              type: "localizedString",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "caption",
              title: "Caption",
              type: "localizedText",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: "title.en",
              subtitle: "caption.en",
            },
          },
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
