import type { Addon, Experience, MenuItem } from "./types";

export const proposalDinnerId = "proposal-dinner-for-two";
export const proposalExtras: Addon[] = (
  [
    [
      "proposal-drone-video",
      {
        en: "Videographer with drone",
        es: "Videógrafo con drone",
        fr: "Vidéaste avec drone",
        pt: "Videomaker com drone",
      },
      399,
    ],
    [
      "proposal-violinist",
      { en: "Violinist", es: "Violinista", fr: "Violoniste", pt: "Violinista" },
      399,
    ],
    [
      "proposal-saxophonist",
      {
        en: "Saxophonist",
        es: "Saxofonista",
        fr: "Saxophoniste",
        pt: "Saxofonista",
      },
      399,
    ],
    [
      proposalDinnerId,
      {
        en: "Romantic dinner for two",
        es: "Cena romántica para dos",
        fr: "Dîner romantique pour deux",
        pt: "Jantar romântico para dois",
      },
      299,
    ],
  ] as const
).map(([key, name, price]) => ({
  _key: key,
  name: { ...name },
  price,
  active: true,
  pricingType: "fixed",
  applicableTo: ["proposal"],
}));

/**
 * Whether a CMS add-on duplicates one of the fixed proposal extras above
 * (video or drone, violin, sax, dinner). Proposal cards hide it and show the
 * fixed extra instead.
 */
export const replacedByProposalExtra = (addon: {
  _id?: string;
  _key?: string;
  name?: { en?: string; es?: string };
}) =>
  /video|drone|violin|violín|sax|dinner|cena/i.test(
    `${addon._id || addon._key} ${addon.name?.en} ${addon.name?.es}`,
  );

export function withProposalExtras(
  e: Experience,
  menu: MenuItem[],
): Experience {
  if (e._type !== "proposalExperience") return e;
  return {
    ...e,
    menuItems: menu,
    availableAddons: [
      ...e.availableAddons.filter((a) => !replacedByProposalExtra(a)),
      ...proposalExtras,
    ],
  };
}
