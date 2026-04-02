export interface StoryCardImage {
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
