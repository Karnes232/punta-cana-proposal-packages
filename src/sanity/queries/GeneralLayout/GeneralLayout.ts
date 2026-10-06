import { client } from "@/sanity/lib/client";

export interface GeneralLayout {
  companyName: string;
  companyDescription?: Partial<Record<"en" | "es" | "fr" | "pt", string>>;
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
  whatsapp?: string;
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
    es,
    fr,
    pt
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
  whatsapp,
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
