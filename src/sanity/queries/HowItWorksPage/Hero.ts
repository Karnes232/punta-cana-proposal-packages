import { client } from "@/sanity/lib/client";

export interface HowItWorksPageHero {
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
  image?: {
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
}

export const howItWorksPageHeroQuery = `*[_type == "HowItWorksPageHero"][0] {
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
  },
  image {
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
  }
}`;

export async function howItWorksPageHero(): Promise<HowItWorksPageHero> {
  return await client.fetch(howItWorksPageHeroQuery);
}
