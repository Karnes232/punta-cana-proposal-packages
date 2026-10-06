import type { SlugValue, ValidationContext } from "sanity";
import { bi } from "./labels";

/**
 * Validation rules shared by the schemas. Each returns true or a bilingual
 * message, for Rule.custom(); errors for what would break the website,
 * warnings (`.warning()`) for guidance.
 */

/** URL-safe slug: lowercase words joined by single hyphens, at most 96. */
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
export const slugFormat = (slug?: SlugValue) =>
  !slug?.current || (SLUG.test(slug.current) && slug.current.length <= 96)
    ? true
    : bi(
        "Solo minúsculas, números y guiones (máx. 96), p. ej. «mi-pagina»",
        "Only lowercase letters, numbers and hyphens (max 96), e.g. «my-page»",
      );

/** An identifier kept in code and URLs (a filter value): slug-shaped text. */
export const identifierFormat = (value?: string) =>
  !value || SLUG.test(value)
    ? true
    : bi(
        "Solo minúsculas, números y guiones, p. ej. «playa»",
        "Only lowercase letters, numbers and hyphens, e.g. «beach»",
      );

/** A link the site can follow: a page path or a full https/mailto/tel link. */
export const linkFormat = (link?: string) =>
  !link || /^(\/|https:\/\/|mailto:|tel:)\S*$/.test(link)
    ? true
    : bi(
        "Empieza con «/» (una página del sitio) o con https://, mailto: o tel:",
        "Start with «/» (a page of the site) or with https://, mailto: or tel:",
      );

/** An image that was added must have its file uploaded. */
export const imageFileIfSet = (image?: { asset?: { _ref?: string } }) =>
  !image || image.asset?._ref
    ? true
    : bi("Sube la imagen o quítala", "Upload the image or remove it");

/** An image with a file needs alt text (for screen readers and Google). */
export const altIfImage = (image?: {
  asset?: { _ref?: string };
  alt?: string | { en?: string };
}) => {
  const alt = typeof image?.alt === "string" ? image.alt : image?.alt?.en;
  return !image?.asset?._ref || alt?.trim()
    ? true
    : bi(
        "Describe la foto (texto alternativo)",
        "Describe the photo (alt text)",
      );
};

/** A localized text: English is the site's fallback, so it can't be empty. */
export const englishRequired = (value?: { en?: string }) =>
  value?.en?.trim()
    ? true
    : bi("Escribe al menos el texto en inglés", "Write at least the English");

/** The languages left empty in a localized text (for a warning). */
export const missingLanguages =
  (languages: readonly string[]) => (value?: Record<string, unknown>) => {
    const missing = languages.filter(
      (l) => !(typeof value?.[l] === "string" && value[l].trim()),
    );
    return missing.length
      ? bi(
          `Falta en: ${missing.join(", ")}`,
          `Missing in: ${missing.join(", ")}`,
        )
      : true;
  };

/** Filter values that are reserved by the site (the "show all" button). */
export const notReserved = (value?: string) =>
  value === "all"
    ? bi(
        "«all» está reservado para el botón «Todos»",
        "«all» is reserved for the «All» button",
      )
    : true;

/**
 * A field value unique among published and draft documents of the same
 * type (ignoring this document's own draft/published pair).
 */
export const uniqueValue =
  (field: string) => async (value: unknown, context: ValidationContext) => {
    if (value === undefined || value === null || value === "") return true;
    const { document, getClient } = context;
    const id = (document?._id ?? "").replace(/^drafts\./, "");
    const taken = await getClient({ apiVersion: "2026-03-07" }).fetch<boolean>(
      `defined(*[_type == $type && ${field} == $value
        && !(_id in [$id, $draft])][0]._id)`,
      { type: document?._type, value, id, draft: `drafts.${id}` },
    );
    return taken
      ? bi(
          "Ya existe otro con este valor",
          "Another one already uses this value",
        )
      : true;
  };

/** No two items share a value, e.g. two FAQ categories with the same name. */
export const uniqueItems =
  <T>(valueOf: (item: T) => unknown) =>
  (items?: T[]) => {
    const values = (items ?? []).map(valueOf).filter((v) => v !== undefined);
    return new Set(values).size === values.length
      ? true
      : bi("Hay elementos repetidos", "Some items are repeated");
  };

/** A referenced document in the same language as this page (warning). */
export const sameLanguage = async (
  reference: { _ref?: string } | undefined,
  context: ValidationContext,
) => {
  const language = (context.document as { language?: string } | undefined)
    ?.language;
  if (!reference?._ref || !language) return true;
  const theirs = await context
    .getClient({ apiVersion: "2026-03-07" })
    .fetch<string | null>(`*[_id == $id][0].language`, {
      id: reference._ref,
    });
  return !theirs || theirs === language
    ? true
    : bi(
        `Está en otro idioma (${theirs}); no se mostrará en esta página`,
        `It's in another language (${theirs}); this page won't show it`,
      );
};
