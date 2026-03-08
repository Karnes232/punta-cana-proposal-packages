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
