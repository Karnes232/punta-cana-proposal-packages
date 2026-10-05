import { defineField, type FieldDefinition, type PreviewValue } from "sanity";
import { bi } from "../shared/labels";
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
  });
export const refs = (
  name: string,
  to: string,
  group?: string,
): FieldDefinition =>
  defineField({
    name,
    type: "array",
    group,
    of: [{ type: "reference", to: [{ type: to }] }],
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
export function validActive(value: unknown) {
  const d = value as Record<string, unknown> | undefined;
  if (!d?.active) return true;
  const name = d.name as { en?: string; es?: string } | undefined;
  if (!name?.en?.trim() || !name?.es?.trim())
    return "Active entries require English and Spanish names";
  return true;
}
export function hasImage(value: unknown) {
  return !!(value as { asset?: { _ref?: string } } | undefined)?.asset?._ref;
}
export function validExperience(value: unknown) {
  const result = validActive(value);
  if (result !== true) return result;
  const d = value as Record<string, unknown> | undefined;
  if (!d) return true;
  if (Number(d.maximumGuests) < Number(d.includedGuests))
    return "maximumGuests must be at least includedGuests";
  if (Number(d.maximumDurationMinutes) < Number(d.includedDurationMinutes))
    return "maximumDurationMinutes must be at least includedDurationMinutes";
  if (
    d.minimumGuests !== undefined &&
    (!Number.isInteger(d.minimumGuests) ||
      Number(d.minimumGuests) < 1 ||
      Number(d.minimumGuests) > Number(d.includedGuests))
  )
    return "minimumGuests must be a positive integer no greater than includedGuests";
  if (!d.active) return true;
  if (!(d.slug as { current?: string })?.current)
    return "Active experiences require a slug";
  if (typeof d.basePrice !== "number" || d.basePrice < 0)
    return "Active experiences require a non-negative basePrice";
  if (!Array.isArray(d.gallery) || d.gallery.length < 1)
    return "Active experiences require at least one gallery photograph";
  if (
    d.gallery.some(
      (p: { image?: unknown; alt?: { en?: string; es?: string } }) =>
        !hasImage(p.image) || !p.alt?.en?.trim() || !p.alt?.es?.trim(),
    )
  )
    return "Each gallery photo requires an image and English/Spanish alt text";
  const description = d.shortDescription as
    | { en?: string; es?: string }
    | undefined;
  if (!description?.en || !description?.es)
    return "Active experiences require descriptions in both languages";
  if (!/^[A-Z]{3}$/.test(String(d.currency || "")))
    return "Use a three-letter currency code";
  if (
    d._type === "romanticDinnerExperience" &&
    (!d.includedGuests ||
      !d.includedDurationMinutes ||
      !d.maximumGuests ||
      !d.maximumDurationMinutes)
  )
    return "Configure guest and duration limits before activation";
  if (
    d._type === "romanticDinnerExperience" &&
    Number(d.maximumGuests) > Number(d.includedGuests) &&
    typeof d.additionalGuestPrice !== "number"
  )
    return "Configure additionalGuestPrice before allowing additional guests";
  return true;
}
