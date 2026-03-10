import { defineField, defineType } from "sanity";
import { DocumentIcon } from "@sanity/icons";

export default defineType({
  name: "HomePageBrandStatement",
  title: "Home Page Brand Statement",
  type: "document",
  icon: DocumentIcon,
  fields: [
    defineField({
      name: "quote",
      title: "Quote",
      type: "localizedString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "localizedText",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "signature",
      title: "Signature",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "quote.en",
      subtitle: "signature",
    },
  },
});
