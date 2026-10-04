/**
 * The bilingual `seo` object (see `localizedSeoProjection` in ../fragments),
 * used by PageSeo documents and stories. Blog posts are per-language
 * documents and use {@link BlogPostSeoResolved} instead.
 */
export interface LocalizedSeo {
  meta: {
    en: { title: string; description: string; keywords: string[] };
    es: { title: string; description: string; keywords: string[] };
  };
  openGraph: {
    en: { title: string; description: string };
    es: { title: string; description: string };
    image: {
      url: string;
      alt?: string;
      width?: number;
      height?: number;
    };
  };
  noIndex: boolean;
  noFollow: boolean;
}

/** A document (e.g. a story) with an embedded bilingual `seo` field. */
export interface EmbeddedLocalizedDocumentSeo {
  _id: string;
  seo: LocalizedSeo;
}
