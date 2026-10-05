import { defineField, defineType } from "sanity";
import { languageField } from "../shared/languageField";
import { DocumentIcon } from "@sanity/icons";

export default defineType({
  name: "howItWorksSteps",
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
    languageField,
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      validation: (Rule) => Rule.required(),
      group: "steps",
    }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (Rule) => Rule.required(),
      group: "steps",
    }),
    defineField({
      name: "headingAccent",
      title: "Heading Accent",
      type: "string",
      validation: (Rule) => Rule.required(),
      group: "steps",
    }),
    defineField({
      name: "subheading",
      title: "Subheading",
      type: "text",
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
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: "label",
              subtitle: "title",
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
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "caption",
              title: "Caption",
              type: "text",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "caption",
            },
          },
        },
      ],
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
