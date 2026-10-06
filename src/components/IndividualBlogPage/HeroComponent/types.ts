export interface PostHeroImage {
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

export interface PostHeroData {
  title: string;
  publishedAt: string;
  categoryTag: string;
  readingTime: number;
  photo: PostHeroImage | null;
}
