import { defineField, defineType } from "sanity";
import {
  englishRequired,
  identifierFormat,
  missingLanguages,
  notReserved,
  uniqueValue,
} from "../shared/validation";
import { TagIcon } from "@sanity/icons";

export default defineType({
  name: "blogCategory",
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
      description:
        "Display label — e.g. 'Proposal Tips' / 'Consejos de Propuesta'",
      type: "blogLocalizedString",
      // English is the fallback for every language.
      validation: (Rule) => [
        Rule.required().custom(englishRequired),
        Rule.custom(missingLanguages(["es", "fr", "pt", "de", "it"])).warning(),
      ],
    }),
  ],
  preview: {
    select: {
      title: "label.en",
    },
  },
});
