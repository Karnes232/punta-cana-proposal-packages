import type { ImageAsset } from "@/sanity/queries/fragments";

export interface GalleryPhoto extends ImageAsset {
  alt?: string;
  caption?: string;
}

/** How many photos to show in the grid before the "+N" overflow tile */
export const GALLERY_VISIBLE_COUNT = 6;
