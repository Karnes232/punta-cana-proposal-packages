import type { SiteLocale } from "@/i18n/locales";
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
  location: Record<SiteLocale, string>;

  /** e.g. "Classic Beach Package" — from the package type reference */
  packageTag: Record<SiteLocale, string>;

  /** Short pull quote — 1–2 sentences max */
  quote: Record<SiteLocale, string>;

  heroPhoto: FeaturedStoryImage;
}
