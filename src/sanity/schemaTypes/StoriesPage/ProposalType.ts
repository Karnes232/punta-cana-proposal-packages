import { defineField, defineType } from "sanity";
import { DocumentIcon } from "@sanity/icons";

export default defineType({
  name: "ProposalType",
  title: "Proposal Type",
  type: "document",
  icon: DocumentIcon,
  fields: [
    defineField({
      name: "type",
      title: "Type",
      type: "array",
      of: [{ type: "object", fields: [
        defineField({
          name: "value",
          title: "Value",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "label",
          title: "Label",
          type: "localizedString",
          validation: (Rule) => Rule.required(),
        }),
      ]}],
      validation: (Rule) => Rule.required(),
    }),

  ],
  preview: {
    select: {
      title: "type.0.label.en",
    },
  },
});