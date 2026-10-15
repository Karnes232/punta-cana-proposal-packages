import type { ImageAsset } from "@/sanity/queries/fragments";

export interface StoryCardImage extends ImageAsset {
  alt?: string;
}

export interface StoryCardData {
  slug: string;
  names: string;
  date: string;
  location: string;
  packageTag: string;
  quote: string;
  /** Sanity package type slug — used for client-side filtering */
  packageType: string;
  photo: StoryCardImage;
}
