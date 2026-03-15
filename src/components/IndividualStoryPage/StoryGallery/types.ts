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

export interface StoryGalleryContent {
  sectionLabelEn: string;
  sectionLabelEs: string;
  /** "View all X photos" — use {count} as placeholder */
  viewAllLabelEn: string;
  viewAllLabelEs: string;
  closeLabelEn: string;
  closeLabelEs: string;
  prevLabelEn: string;
  prevLabelEs: string;
  nextLabelEn: string;
  nextLabelEs: string;
}

export const defaultStoryGalleryContent: StoryGalleryContent = {
  sectionLabelEn: "The Proposal",
  sectionLabelEs: "La Propuesta",
  viewAllLabelEn: "View all {count} photos",
  viewAllLabelEs: "Ver las {count} fotos",
  closeLabelEn: "Close",
  closeLabelEs: "Cerrar",
  prevLabelEn: "Previous",
  prevLabelEs: "Anterior",
  nextLabelEn: "Next",
  nextLabelEs: "Siguiente",
};

/** How many photos to show in the grid before the "+N" overflow tile */
export const GALLERY_VISIBLE_COUNT = 6;
