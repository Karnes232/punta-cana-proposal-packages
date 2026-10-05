import { defineField, type SlugIsUniqueValidator } from "sanity";

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

/**
 * Slug uniqueness for per-language documents: every language version keeps
 * the same slug (e.g. /fr/stories/lucia-and-marco), so a slug only has to be
 * unique among documents of the same type and language.
 */
export const isUniqueInLanguage: SlugIsUniqueValidator = async (
  slug,
  context,
) => {
  const { document, getClient } = context;
  const id = (document?._id ?? "").replace(/^drafts\./, "");
  return getClient({ apiVersion: "2026-03-07" }).fetch<boolean>(
    `!defined(*[_type == $type && slug.current == $slug && language == $language
      && !(_id in [$id, $draft])][0]._id)`,
    {
      type: document?._type,
      slug,
      language: document?.language ?? null,
      id,
      draft: `drafts.${id}`,
    },
  );
};
