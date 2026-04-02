import { defineField, defineType } from "sanity";
import { TagIcon } from "@sanity/icons";

export default defineType({
  name: "BlogCategory",
  title: "Blog Category",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({
      name: "value",
      title: "Value",
      description:
        "URL-safe slug used for filtering — e.g. 'tips', 'destinations'",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "label",
      title: "Label",
      description:
        "Display label — e.g. 'Proposal Tips' / 'Consejos de Propuesta'",
      type: "localizedString",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "label.en",
    },
  },
});
