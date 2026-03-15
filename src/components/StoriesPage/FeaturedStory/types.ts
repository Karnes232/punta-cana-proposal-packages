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
  slug: string;

  /** e.g. "Sofia & Alejandro" */
  names: string;

  /** e.g. "December 2024" */
  date: string;

  /** e.g. "Playa Bávaro, Punta Cana" */
  location: string;

  /** e.g. "Classic Beach Package" — from the package type reference */
  packageTag: string;

  /** Short pull quote — 1–2 sentences max */
  quote: string;

  photo: FeaturedStoryImage;
}

export interface FeaturedStoryContent {
  /** Eyebrow label above the card */
  eyebrowEn: string;
  eyebrowEs: string;

  /** CTA button label */
  ctaLabelEn: string;
  ctaLabelEs: string;

  /** "Proposed" date prefix — e.g. "Proposed · December 2024" */
  proposedPrefixEn: string;
  proposedPrefixEs: string;
}

export const defaultFeaturedStoryContent: FeaturedStoryContent = {
  eyebrowEn: "Featured Story",
  eyebrowEs: "Historia Destacada",

  ctaLabelEn: "Read Their Story",
  ctaLabelEs: "Leer Su Historia",

  proposedPrefixEn: "Proposed",
  proposedPrefixEs: "Propuesta",
};

export const defaultFeaturedStory: FeaturedStoryData = {
  slug: "sofia-and-alejandro",
  names: "Sofia & Alejandro",
  date: "December 2024",
  location: "Playa Bávaro, Punta Cana",
  packageTag: "Classic Beach Package",
  quote:
    "I had no idea what was coming. The moment I turned around and saw the roses, the photographer, and him on one knee — I completely fell apart. It was more perfect than anything I could have dreamed.",
  photo: {
    asset: {
      url: "https://picsum.photos/1200/800?random=1",
      metadata: {
        dimensions: {
          width: 1200,
          height: 800,
        },
      },
    },
    alt: "Sofia and Alejandro proposal on the beach in Punta Cana",
  },
};
