import { client } from "@/sanity/lib/client";

export interface Logo {
  companyLogo: {
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

export const logoQuery = `*[_type == "generalLayout"][0] {
    companyLogo {
        asset-> {
            url,
            metadata {
                dimensions
            }
        },
        alt
    }
}`;

export async function getLogo(): Promise<Logo | null> {
  return await client.fetch(logoQuery);
}

export interface GeneralLayout {
  companyName: string;
  companyDescription: {
    en: string;
    es: string;
  };
  companyLogo: {
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
  telephone: string;
  email: string;
  socialLinks: {
    facebook: string;
    instagram: string;
    xURL: string;
    MessengerURL: string;
  };
}

export const generalLayoutQuery = `*[_type == "generalLayout"][0] {
  companyName,
  companyDescription {
    en,
    es
  },
  companyLogo {
    asset-> {
      url,
      metadata {
        dimensions
      }
    },
    alt
  },
  telephone,
  email,
  socialLinks {
    facebook,
    instagram,
    xURL,
    MessengerURL
  }
}`;

export async function getGeneralLayout(): Promise<GeneralLayout | null> {
  return await client.fetch(generalLayoutQuery);
}
