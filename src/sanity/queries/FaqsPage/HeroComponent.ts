import { client } from "@/sanity/lib/client";

export interface FaqsPageHeroComponent {
  heroImage?: {
    asset: {
      url: string;
      metadata: {
        dimensions: {
          width: number;
          height: number;
        };
      };
    };
    alt: string;
  };
  eyebrow: {
    en: string;
    es: string;
  };
  headingLine1: {
    en: string;
    es: string;
  };
  headingLine2: {
    en: string;
    es: string;
  };
  subheading: {
    en: string;
    es: string;
  };
}

export const faqsPageHeroComponentQuery = `*[_type == "FaqsPageHeroComponent"][0] {
  heroImage {
    asset-> {
      url,
      metadata {
        dimensions {
          width,
          height
        }
      }
    },
    alt
  },
  eyebrow {
    en,
    es
  },
  headingLine1 {
    en,
    es
  },
  headingLine2 {
    en,
    es
  },
  subheading {
    en,
    es
  }
}`;

export const faqsPageHeroComponent = async () => {
  return await client.fetch(faqsPageHeroComponentQuery);
};
