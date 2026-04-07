/**
 * Embedded `seo` field shape (en/es) used by stories and proposal packages.
 * Blog posts use per-language documents + {@link BlogPostSeoResolved} instead.
 */
export interface EmbeddedLocalizedDocumentSeo {
  _id: string;
  seo: {
    meta: {
      en: {
        title: string;
        description: string;
        keywords: string[];
      };
      es: {
        title: string;
        description: string;
        keywords: string[];
      };
    };
    openGraph: {
      en: {
        title: string;
        description: string;
      };
      es: {
        title: string;
        description: string;
      };
      image: {
        url: string;
        alt: string;
        width: number;
        height: number;
      };
    };
    noIndex: boolean;
    noFollow: boolean;
  };
}
