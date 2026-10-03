export interface MoreStoriesStory {
  slug: string;
  names: string;
  date: string; // pre-formatted
  location: string;
  packageTag: string;
  quote: string;
  heroPhoto: {
    asset: {
      url: string;
      metadata: { dimensions: { width: number; height: number } };
    };
    alt?: string;
  };
}
