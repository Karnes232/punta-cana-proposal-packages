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
    photo: PostHeroImage;
  }
  
  export interface PostHeroContent {
    backLabelEn: string;
    backLabelEs: string;
    readTimeSuffixEn: string;
    readTimeSuffixEs: string;
  }
  
  export const defaultPostHeroContent: PostHeroContent = {
    backLabelEn: "All Posts",
    backLabelEs: "Todos los Artículos",
    readTimeSuffixEn: "min read",
    readTimeSuffixEs: "min de lectura",
  };