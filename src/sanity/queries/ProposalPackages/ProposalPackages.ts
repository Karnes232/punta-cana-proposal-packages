import { client } from "@/sanity/lib/client";

export interface ProposalPackages {
  page: string;
  heroImage: {
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
  heroEyebrow: {
    en: string;
    es: string;
  };
  heroHeadingLine1: {
    en: string;
    es: string;
  };
  heroHeadingLine2: {
    en: string;
    es: string;
  };
  heroSubheading: {
    en: string;
    es: string;
  };
  introEyebrow: {
    en: string;
    es: string;
  };
  introHeadingLine1: {
    en: string;
    es: string;
  };
  introHeadingLine2: {
    en: string;
    es: string;
  };
  introDescription: {
    en: string;
    es: string;
  };
  packages: {
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
    name: {
      en: string;
      es: string;
    };
    slug: {
      current: string;
    };
    price: number;
    description: {
      en: string;
      es: string;
    };
    inclusions: {
      icon: string;
      title: {
        en: string;
        es: string;
      };
      description: {
        en: string;
        es: string;
      };
    }[];
  }[];
}

export const proposalPackagesQueryString = `*[_type == "ProposalPackages" && page == $page][0] {
  page,
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
  heroEyebrow {
    en,
    es
  },
  heroHeadingLine1 {
    en,
    es
  },
  heroHeadingLine2 {
    en,
    es
  },
  heroSubheading {
    en,
    es
  },
  introEyebrow {
    en,
    es
  },
  introHeadingLine1 {
    en,
    es
  },
  introHeadingLine2 {
    en,
    es
  },
  introDescription {
    en,
    es
  },
 packages[]->{
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
    name {
      en,
      es
    },
    slug {
      current
    },
    price,
    description {
      en,
      es
    },
    inclusions[] {
      icon,
      title {
        en,
        es
      },
      description {
        en,
        es
      },
    }, 
  }
  
}`;

export const proposalPackagesQuery = async (
  page: string,
): Promise<ProposalPackages> => {
  const data = await client.fetch(proposalPackagesQueryString, { page });
  return data;
};
