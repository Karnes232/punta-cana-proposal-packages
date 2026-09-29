import type { Entry, Experience, Localized, Locale } from "./types";
export const local = (value: Localized | undefined, locale: Locale) =>
  value?.[locale] || "";
export const id = (value: Entry) => value._id || value._key || "";
export const sorted = <T extends { displayOrder?: number }>(
  items: T[] | undefined | null,
): T[] =>
  [...(items || [])]
    .filter(Boolean)
    .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));
export const active = <T extends Entry>(items: T[] | undefined | null) =>
  sorted(items).filter((x) => x && x.active === true);
export function normalizeExperience(e: Experience): Experience {
  return {
    ...e,
    gallery: sorted(e.gallery),
    styles: active(e.styles),
    inclusions: active(e.inclusions),
    availableAddons: active(e.availableAddons).filter((a) =>
      a.applicableTo?.includes(
        e._type === "proposalExperience" ? "proposal" : "romanticDinner",
      ),
    ),
    menuItems: active(e.menuItems),
    beverages: active(e.beverages),
    occasions: active(e.occasions),
  };
}
