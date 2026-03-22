import { client } from "@/sanity/lib/client";

export interface ContactPageContent {
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
  } | null;
  formEyebrow: {
    en: string;
    es: string;
  };
  formHeadingLine1: {
    en: string;
    es: string;
  };
  formHeadingLine2: {
    en: string;
    es: string;
  };
  trustBarStats: {
    value: {
      en: string;
      es: string;
    };
    label: {
      en: string;
      es: string;
    };
  }[];
}

export const contactPageContentQuery = `*[_type == "ContactPageContent"][0] {
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
  formEyebrow {
    en,
    es
  },
  formHeadingLine1 {
    en,
    es
  },
  formHeadingLine2 {
    en,
    es
  },
  trustBarStats[] {
    value {
      en,
      es
    },
    label {
      en,
      es
    }
  }
}`;

export async function contactPageContent(): Promise<ContactPageContent> {
  const query = await client.fetch(contactPageContentQuery);
  return query;
}

export interface ContactInfo {
  telephone: string;
  email: string;
}

export const contactInfoQuery = `*[_type == "generalLayout"][0] {
  telephone,
  email,
}`;

export async function contactInfo(): Promise<ContactInfo> {
  const query = await client.fetch(contactInfoQuery);
  return query;
}
