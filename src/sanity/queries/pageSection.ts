import { languageDocumentId, PAGE_SINGLETONS } from "@/sanity/constants";

type PageSectionType = keyof typeof PAGE_SINGLETONS;

/**
 * GROQ for a page section's document in the visitor's language, falling back
 * to the English document while a language hasn't been written yet. Pass
 * `pageSectionParams()` as the query parameters.
 */
export const pageSectionDocument = (type: PageSectionType) =>
  `coalesce(*[_type == "${type}" && _id == $id][0], *[_type == "${type}" && _id == $fallbackId][0])`;

export const pageSectionParams = (type: PageSectionType, locale: string) => ({
  id: languageDocumentId(PAGE_SINGLETONS[type], locale),
  fallbackId: languageDocumentId(PAGE_SINGLETONS[type], "en"),
});
