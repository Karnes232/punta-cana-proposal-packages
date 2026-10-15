import type { ImageAsset } from "@/sanity/queries/fragments";

export interface PostHeroImage extends ImageAsset {
  alt?: string;
}

export interface PostHeroData {
  title: string;
  publishedAt: string;
  categoryTag: string;
  readingTime: number;
  photo: PostHeroImage | null;
}
