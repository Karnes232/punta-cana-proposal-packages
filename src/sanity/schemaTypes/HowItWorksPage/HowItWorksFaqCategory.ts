import { defineType, defineField } from "sanity";
import { DocumentIcon } from "@sanity/icons";
export default defineType({
  name: "HowItWorksPageHowItWorksFaqCategory",
  title: "How It Works Page FAQ Category",
  type: "document",
  icon: DocumentIcon,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "localizedString",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "name.en",
    },
  },
});
