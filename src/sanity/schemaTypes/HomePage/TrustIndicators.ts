import { defineField, defineType } from "sanity";

export default defineType({
  name: "trustIndicators",
  title: "Trust Indicators",
  type: "document",
  fields: [
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "icon",
              title: "Icon",
              type: "string",
              options: {
                list: ["proposals", "rating", "private", "location"],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "value",
              title: "Value",
              type: "localizedString",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "label",
              title: "Label",
              type: "localizedString",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "sublabel",
              title: "Sublabel",
              type: "localizedString",
              validation: (Rule) => Rule.optional(),
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "items.0.label.en",
      subtitle: "items.0.sublabel.en",
    },
  },
});
