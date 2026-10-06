import {
  defineField,
  type FieldDefinition,
  type Path,
  type PreviewValue,
  type ValidationContext,
} from "sanity";
import { DINNER_TEMPLATE_ID } from "@/sanity/constants";
import { bi } from "../shared/labels";
import { altIfImage, imageFileIfSet } from "../shared/validation";
export const field = (
  name: string,
  type = "string",
  group?: string,
): FieldDefinition => defineField({ name, type, ...(group ? { group } : {}) });
export const money = (name: string, group?: string): FieldDefinition =>
  defineField({
    name,
    type: "number",
    group,
    validation: (r) => r.min(0).precision(2),
  });
export const number = (name: string, group?: string): FieldDefinition =>
  defineField({
    name,
    type: "number",
    group,
    validation: (r) => r.integer().min(0),
  });
export const active = defineField({
  name: "active",
  type: "boolean",
  initialValue: false,
  description: bi(
    "Apágalo para ocultarlo del sitio sin borrarlo",
    "Turn off to hide it from the site without deleting it",
  ),
});
export const order: FieldDefinition = {
  ...number("displayOrder"),
  description: bi(
    "Número menor = aparece primero",
    "Lower number = shown first",
  ),
};
export const named = [
  field("name", "localizedString"),
  field("description", "localizedText"),
  active,
  order,
];
/**
 * A photo with alt text. Shared documents keep the alt in every language
 * (`localizedString`); per-language documents use one language (`string`).
 */
export const image = (
  name: string,
  alt: "localizedString" | "string" = "localizedString",
): FieldDefinition =>
  defineField({
    name,
    type: "image",
    options: { hotspot: true },
    fields: [
      {
        ...field("alt", alt),
        description: bi(
          "Describe la foto para Google y lectores de pantalla",
          "Describe the photo for Google and screen readers",
        ),
      },
    ],
    // An added photo needs its file; its alt text is strongly advised.
    validation: (Rule) => [
      Rule.custom(imageFileIfSet),
      Rule.custom(altIfImage).warning(),
    ],
  });
// A reference picker only offers documents matching `filter`, e.g. active ones.
type ReferenceFilter =
  | string
  | ((context: { document: { _type?: string } }) => {
      filter: string;
      params: Record<string, unknown>;
    });
export const refs = (
  name: string,
  to: string,
  group?: string,
  filter?: ReferenceFilter,
): FieldDefinition =>
  defineField({
    name,
    type: "array",
    group,
    of: [
      {
        type: "reference",
        to: [{ type: to }],
        ...(filter ? { options: { filter, disableNew: true } } : {}),
      },
    ],
    validation: (r) => r.unique(),
  });
export const objects = (
  name: string,
  type: string,
  group?: string,
): FieldDefinition =>
  defineField({ name, type: "array", group, of: [{ type }] });
export const options = (name: string, values: string[]): FieldDefinition =>
  defineField({ name, type: "string", options: { list: values } });
export const preview = {
  select: {
    name: "name.en",
    internal: "internalTitle",
    price: "basePrice",
    active: "active",
    media: "gallery.0.image",
  },
  prepare(v: Record<string, unknown>) {
    return {
      title: String(v.name || v.internal || "Untitled"),
      subtitle: `${v.price ?? ""} · ${v.active ? bi("Activo", "Active") : bi("Inactivo", "Inactive")}`,
      media: v.media as PreviewValue["media"],
    };
  },
};
/** A validation problem on one field (the Studio highlights that field). */
type Problem = { message: string; paths: Path[] };
const at = (path: string | Path, es: string, en: string): Problem => ({
  message: bi(es, en),
  paths: [typeof path === "string" ? [path] : path],
});

/** Active entries are shown on the site: they need English and Spanish names. */
export function validActive(value: unknown): true | Problem {
  const d = value as Record<string, unknown> | undefined;
  if (!d?.active) return true;
  const name = d.name as { en?: string; es?: string } | undefined;
  if (!name?.en?.trim() || !name?.es?.trim())
    return at(
      "name",
      "Si está activo, necesita el nombre en inglés y en español",
      "Active entries need an English and a Spanish name",
    );
  return true;
}
export function hasImage(value: unknown) {
  return !!(value as { asset?: { _ref?: string } } | undefined)?.asset?._ref;
}

// The dinner template is shown on the site (the dinners page and the
// proposals' "dinner for two" extra) although it stays inactive.
const shownOnSite = (d: Record<string, unknown>) =>
  !!d.active ||
  String(d._id ?? "").replace(/^drafts\./, "") === DINNER_TEMPLATE_ID;

/** Every rule a proposal or dinner must meet; all problems at once. */
export function validExperience(value: unknown): true | Problem[] {
  const d = value as Record<string, unknown> | undefined;
  if (!d) return true;
  const problems: Problem[] = [];
  const named = validActive(value);
  if (named !== true) problems.push(named);
  if (Number(d.maximumGuests) < Number(d.includedGuests))
    problems.push(
      at(
        "maximumGuests",
        "El máximo de invitados no puede ser menor que los incluidos",
        "Maximum guests can't be fewer than included guests",
      ),
    );
  if (Number(d.maximumDurationMinutes) < Number(d.includedDurationMinutes))
    problems.push(
      at(
        "maximumDurationMinutes",
        "La duración máxima no puede ser menor que la incluida",
        "Maximum duration can't be shorter than the included duration",
      ),
    );
  if (
    d.minimumGuests !== undefined &&
    (!Number.isInteger(d.minimumGuests) ||
      Number(d.minimumGuests) < 1 ||
      Number(d.minimumGuests) > Number(d.includedGuests))
  )
    problems.push(
      at(
        "minimumGuests",
        "Un número entero entre 1 y los invitados incluidos",
        "A whole number from 1 to the included guests",
      ),
    );
  if (shownOnSite(d)) {
    if (!(d.slug as { current?: string })?.current)
      problems.push(
        at("slug", "Falta la URL (slug)", "The URL (slug) is missing"),
      );
    if (typeof d.basePrice !== "number" || d.basePrice <= 0)
      problems.push(
        at(
          "basePrice",
          "Indica un precio mayor que 0",
          "Enter a price above 0",
        ),
      );
    const gallery = Array.isArray(d.gallery) ? d.gallery : [];
    if (!gallery.length)
      problems.push(
        at("gallery", "Añade al menos una foto", "Add at least one photo"),
      );
    gallery.forEach(
      (
        photo: {
          _key?: string;
          image?: unknown;
          alt?: { en?: string; es?: string };
        },
        index,
      ) => {
        if (
          !hasImage(photo.image) ||
          !photo.alt?.en?.trim() ||
          !photo.alt?.es?.trim()
        )
          problems.push(
            at(
              ["gallery", photo._key ? { _key: photo._key } : index],
              "Cada foto necesita la imagen y el texto alternativo en inglés y español",
              "Each photo needs its image and English and Spanish alt text",
            ),
          );
      },
    );
    const description = d.shortDescription as
      | { en?: string; es?: string }
      | undefined;
    if (!description?.en?.trim() || !description?.es?.trim())
      problems.push(
        at(
          "shortDescription",
          "Escribe la descripción corta en inglés y en español",
          "Write the short description in English and Spanish",
        ),
      );
    if (d._type === "romanticDinnerExperience") {
      for (const field of [
        "includedGuests",
        "includedDurationMinutes",
        "maximumGuests",
        "maximumDurationMinutes",
      ])
        if (!d[field])
          problems.push(
            at(
              field,
              "Configura invitados y duración antes de activar",
              "Set guests and duration before activating",
            ),
          );
      if (
        Number(d.maximumGuests) > Number(d.includedGuests) &&
        typeof d.additionalGuestPrice !== "number"
      )
        problems.push(
          at(
            "additionalGuestPrice",
            "Indica el precio por invitado adicional",
            "Enter the price per additional guest",
          ),
        );
    }
  }
  return problems.length ? problems : true;
}

/**
 * A dinner shown on the site must offer a full three-course menu: at least
 * one active starter, main and dessert (otherwise it can't be requested).
 */
export async function dinnerMenuComplete(
  value: unknown,
  context: ValidationContext,
): Promise<true | Problem> {
  const d = value as Record<string, unknown> | undefined;
  if (!d || !shownOnSite(d)) return true;
  const ids = ((d.menuItems as { _ref?: string }[] | undefined) ?? [])
    .map((r) => r._ref)
    .filter(Boolean);
  const courses = await context
    .getClient({ apiVersion: "2026-03-07" })
    .fetch<string[]>(`*[_id in $ids && active == true].courseType`, { ids });
  const missing = ["starter", "main", "dessert"].filter(
    (course) => !courses.includes(course),
  );
  return missing.length
    ? at(
        "menuItems",
        `Falta al menos un plato activo de: ${missing.join(", ")}`,
        `Add at least one active dish for: ${missing.join(", ")}`,
      )
    : true;
}
