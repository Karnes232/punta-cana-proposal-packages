import { client } from "@/sanity/lib/client";
import { IndividualBlogSEO } from "../BlogPage/IndividualBlog";

export interface IndividualProposalPackage {
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
  gallery: {
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
    caption: {
      en: string;
      es: string;
    };
  }[];
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
  variants: {
    name: {
      en: string;
      es: string;
    };
    description: {
      en: string;
      es: string;
    };
    price: number;
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
  }[];
  addons: {
    name: {
      en: string;
      es: string;
    };
    description: {
      en: string;
      es: string;
    };
    price: number;
    icon: string;
  }[];
  seo: {
    structuredData: {
      en: string;
      es: string;
    };
  };
}

export const individualProposalPackageQueryString = `*[_type == "IndividualProposalPackage" && slug.current == $slug][0] {
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
  gallery[] {
    asset-> {
      url,
      metadata {
        dimensions {
          width,
          height
        }
      }
    },
    alt,
    caption {
      en,
      es
    }
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
  variants[] {
    name {
      en,
      es
    },
    description {
      en,
      es
    },
    price,
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
  },
  addons[] {
    name {
      en,
      es
    },
    description {
      en,
      es
    },
    price,
    icon
  },
  seo {
    structuredData {
      en,
      es
    }
  },
}`;

export const individualProposalPackageQuery = async (
  slug: string,
): Promise<IndividualProposalPackage> => {
  return await client.fetch(individualProposalPackageQueryString, { slug });
};

export const individualProposalPackageSEOQueryString = `*[_type == "IndividualProposalPackage" && slug.current == $slug][0] {
  _id,
  seo {
        meta {
    en {
      title,
      description,
      keywords
    },
    es {
      title,
      description,
      keywords
    }
  },
  // Open Graph data
  openGraph {
    en {
      title,
      description
    },
    es {
      title,
      description
    },
    "image": {
      "url": image.asset->url,
      "alt": image.alt,
      "width": image.asset->metadata.dimensions.width,
      "height": image.asset->metadata.dimensions.height
    }
  },
  // Other SEO settings
  noIndex,
  noFollow
    }
}`;

export const individualStorySEOQuery = async (
  slug: string,
): Promise<IndividualBlogSEO> => {
  return client.fetch(individualProposalPackageSEOQueryString, { slug });
};
