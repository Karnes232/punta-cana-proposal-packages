export interface FeaturedStoryImage {
  asset: {
    url: string;
    metadata: {
      dimensions: {
        width: number;
        height: number;
      };
    };
  };
  alt?: string;
}

export interface FeaturedStoryData {
  /** Sanity document slug — used to build the /stories/[slug] link */
  slug: { current: string };

  /** e.g. "Sofia & Alejandro" */
  names: string;

  /** e.g. "December 2024" */
  date: string;

  /** e.g. "Playa Bávaro, Punta Cana" */
  location: Record<"en" | "es", string>;

  /** e.g. "Classic Beach Package" — from the package type reference */
  packageTag: Record<"en" | "es", string>;

  /** Short pull quote — 1–2 sentences max */
  quote: Record<"en" | "es", string>;

  heroPhoto: FeaturedStoryImage;
}

// export interface FeaturedStoryContent {
//   /** Eyebrow label above the card */
//   eyebrowEn: string;
//   eyebrowEs: string;

//   /** CTA button label */
//   ctaLabelEn: string;
//   ctaLabelEs: string;

//   /** "Proposed" date prefix — e.g. "Proposed · December 2024" */
//   proposedPrefixEn: string;
//   proposedPrefixEs: string;
// }

// export const defaultFeaturedStoryContent: FeaturedStoryContent = {
//   eyebrowEn: "Featured Story",
//   eyebrowEs: "Historia Destacada",

//   ctaLabelEn: "Read Their Story",
//   ctaLabelEs: "Leer Su Historia",

//   proposedPrefixEn: "Proposed",
//   proposedPrefixEs: "Propuesta",
// };

