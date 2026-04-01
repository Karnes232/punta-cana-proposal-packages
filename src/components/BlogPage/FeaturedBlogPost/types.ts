export interface FeaturedPostImage {
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
  
  export interface FeaturedPostData {
    /** Sanity document slug — used to build the /blog/[slug] link */
    slug: { current: string };
  
    /** e.g. "The Ultimate Guide to Planning a Proposal in Punta Cana" */
    title: Record<"en" | "es", string>;
  
    /** e.g. "2025-03-15" */
    publishedAt: string;
  
    /** e.g. "Planning Tips" / "Consejos de Planificación" */
    categoryTag: Record<"en" | "es", string>;
  
    /** Short 1–2 sentence excerpt shown on the card */
    excerpt: Record<"en" | "es", string>;
  
    /** Estimated reading time in minutes */
    readingTime: number;
  
    heroPhoto: FeaturedPostImage;
  }
  
  export interface FeaturedPostContent {
    /** Eyebrow label above the card */
    eyebrowEn: string;
    eyebrowEs: string;
  
    /** CTA button label */
    ctaLabelEn: string;
    ctaLabelEs: string;
  
    /** Reading time suffix — e.g. "min read" */
    readTimeSuffixEn: string;
    readTimeSuffixEs: string;
  }
  
  export const defaultFeaturedPostContent: FeaturedPostContent = {
    eyebrowEn: "Featured Post",
    eyebrowEs: "Artículo Destacado",
  
    ctaLabelEn: "Read Article",
    ctaLabelEs: "Leer Artículo",
  
    readTimeSuffixEn: "min read",
    readTimeSuffixEs: "min de lectura",
  };
  
  export const defaultFeaturedPost: FeaturedPostData = {
    slug: { current: "the-ultimate-guide-to-planning-a-proposal-in-punta-cana" },
    title: {
      en: "The Ultimate Guide to Planning a Proposal in Punta Cana",
      es: "La Guía Definitiva para Planificar una Propuesta en Punta Cana",
    },
    publishedAt: "2025-03-15",
    categoryTag: {
      en: "Planning Tips",
      es: "Consejos de Planificación",
    },
    excerpt: {
      en: "From choosing the perfect beach to coordinating florals, photography, and the element of surprise — everything you need to plan a flawless Caribbean proposal.",
      es: "Desde elegir la playa perfecta hasta coordinar flores, fotografía y el elemento sorpresa — todo lo que necesitas para planificar una propuesta impecable en el Caribe.",
    },
    readingTime: 8,
    heroPhoto: {
      asset: {
        url: "https://picsum.photos/1200/800?random=10",
        metadata: {
          dimensions: {
            width: 1200,
            height: 800,
          },
        },
      },
      alt: "Romantic proposal setup on Playa Bávaro at golden hour",
    },
  };