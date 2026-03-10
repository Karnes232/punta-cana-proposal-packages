import { client } from "@/sanity/lib/client";

export interface HomePagePackageCategories {
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
  categories: {
    title: {
      en: string;
      es: string;
    };
    description: {
      en: string;
      es: string;
    };
    href: string;
    image: {
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
    ctaButtonLabel: {
      en: string;
      es: string;
    };
  }[];
}

export const homePagePackageCategoriesQuery = `*[_type == "HomePagePackageCategories"][0] {
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
  categories[] {
    title {
      en,
      es
    },
    description {
      en,
      es
    },
    href,
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
    },
    ctaButtonLabel {
      en,
      es
    }
  }
}`;

export const homePagePackageCategories =
  async (): Promise<HomePagePackageCategories> => {
    return await client.fetch(homePagePackageCategoriesQuery);
  };
