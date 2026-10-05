export interface GalleryPhoto {
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
  caption?: string;
}

/** How many photos to show in the grid before the "+N" overflow tile */
export const GALLERY_VISIBLE_COUNT = 6;
