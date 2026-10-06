import { defineField, defineType } from "sanity";
import {
  englishRequired,
  identifierFormat,
  missingLanguages,
  notReserved,
  uniqueValue,
} from "../shared/validation";
import { DocumentIcon } from "@sanity/icons";

export default defineType({
  name: "storyType",
  title: "Proposal Type",
  type: "document",
  icon: DocumentIcon,
  fields: [
    defineField({
      name: "value",
      title: "Value",
      type: "string",
      // The filter's key on the site; "all" is its "show everything" button.
      validation: (Rule) =>
        Rule.required()
          .custom(identifierFormat)
          .custom(notReserved)
          .custom(uniqueValue("value")),
    }),
    defineField({
      name: "label",
      title: "Label",
      type: "localizedString",
      // English is the fallback for every language.
      validation: (Rule) => [
        Rule.required().custom(englishRequired),
        Rule.custom(missingLanguages(["es", "fr", "pt"])).warning(),
      ],
    }),
  ],
  preview: {
    select: {
      title: "label.en",
    },
  },
});
