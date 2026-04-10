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

/** Blog listing + categories: same locales as `ALL_LOCALES` in app routing. */
export const blogLocalizedString = defineType({
  name: "blogLocalizedString",
  title: "Localized String (Blog)",
  type: "object",
  fields: [
    defineField({ name: "en", title: "English", type: "string" }),
    defineField({ name: "es", title: "Español", type: "string" }),
    defineField({ name: "fr", title: "Français", type: "string" }),
    defineField({ name: "de", title: "Deutsch", type: "string" }),
    defineField({ name: "it", title: "Italiano", type: "string" }),
    defineField({ name: "pt", title: "Português", type: "string" }),
    defineField({ name: "zh", title: "chinese", type: "string" }),
    defineField({ name: "ru", title: "Russian", type: "string" }),
    defineField({ name: "ar", title: "arabic", type: "string" }),
  ],
});

export const blogLocalizedText = defineType({
  name: "blogLocalizedText",
  title: "Localized Text (Blog)",
  type: "object",
  fields: [
    defineField({ name: "en", title: "English", type: "text" }),
    defineField({ name: "es", title: "Español", type: "text" }),
    defineField({ name: "fr", title: "Français", type: "text" }),
    defineField({ name: "de", title: "Deutsch", type: "text" }),
    defineField({ name: "it", title: "Italiano", type: "text" }),
    defineField({ name: "pt", title: "Português", type: "text" }),
    defineField({ name: "zh", title: "chinese", type: "string" }),
    defineField({ name: "ru", title: "Russian", type: "string" }),
    defineField({ name: "ar", title: "arabic", type: "string" }),
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
