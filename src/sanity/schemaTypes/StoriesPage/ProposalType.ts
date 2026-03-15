import { defineField, defineType } from "sanity";
import { DocumentIcon } from "@sanity/icons";

export default defineType({
  name: "ProposalType",
  title: "Proposal Type",
  type: "document",
  icon: DocumentIcon,
  fields: [
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
  ],
  preview: {
    select: {
      title: "label.en",
    },
  },
});
