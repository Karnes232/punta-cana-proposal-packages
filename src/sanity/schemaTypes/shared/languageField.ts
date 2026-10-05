import { defineField } from "sanity";

/**
 * The language of a per-language document (PER_LANGUAGE_TYPES). Set by the
 * @sanity/document-internationalization plugin and the migration scripts;
 * editors switch language with the plugin's Translations menu.
 */
export const languageField = defineField({
  name: "language",
  type: "string",
  readOnly: true,
  hidden: true,
});
