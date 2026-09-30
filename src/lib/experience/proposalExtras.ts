import type { Addon, Experience, MenuItem } from "./types";

export const proposalDinnerId = "proposal-dinner-for-two";
export const proposalExtras: Addon[] = [
  [
    "proposal-drone-video",
    "Videographer with drone",
    "Videógrafo con drone",
    399,
  ],
  ["proposal-violinist", "Violinist", "Violinista", 399],
  ["proposal-saxophonist", "Saxophonist", "Saxofonista", 399],
  [proposalDinnerId, "Romantic dinner for two", "Cena romántica para dos", 299],
].map(([key, en, es, price]) => ({
  _key: String(key),
  name: { en: String(en), es: String(es) },
  price: Number(price),
  active: true,
  pricingType: "fixed",
  applicableTo: ["proposal"],
}));

export function withProposalExtras(
  e: Experience,
  menu: MenuItem[],
): Experience {
  if (e._type !== "proposalExperience") return e;
  return {
    ...e,
    menuItems: menu,
    availableAddons: [
      ...e.availableAddons.filter(
        (a) =>
          !/video|drone|violin|violín|sax|dinner|cena/i.test(
            `${a._id || a._key} ${a.name?.en} ${a.name?.es}`,
          ),
      ),
      ...proposalExtras,
    ],
  };
}
