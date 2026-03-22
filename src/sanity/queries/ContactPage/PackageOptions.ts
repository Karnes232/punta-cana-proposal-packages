import { client } from "@/sanity/lib/client";

export interface PackageOptions {
  categories: {
    title: {
      en: string;
      es: string;
    };
  }[];
}

export const packageOptionsQuery = `*[_type == "HomePagePackageCategories"][0] {
   categories[] {
    title {
      en,
      es
    },
  }
}`;

export const packageOptions = async (): Promise<PackageOptions> => {
  return await client.fetch(packageOptionsQuery);
};
