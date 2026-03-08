import { defineType, defineField } from "sanity";

export const localizedString = defineType({
  name: "localizedString",
  title: "Localized String",
  type: "object",
  fields: [
    defineField({ name: "en", title: "English", type: "string" }),
    defineField({ name: "es", title: "Español", type: "string" }),
  ],
});

export const localizedText = defineType({
  name: "localizedText",
  title: "Localized Text",
  type: "object",
  fields: [
    defineField({ name: "en", title: "English", type: "text" }),
    defineField({ name: "es", title: "Español", type: "text" }),
  ],
});

export const localizedBlock = defineType({
  name: "localizedBlock",
  title: "Localized Rich Text",
  type: "object",
  fields: [
    defineField({
      name: "en",
      title: "English",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "es",
      title: "Español",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
});
