/**
 * A per-language document's SEO object (blogPostSeo schema): pages, stories
 * and blog posts. Projected by `documentSeoProjection` in ../fragments.
 */
export interface DocumentSeo {
  meta: {
    title: string;
    description: string;
    keywords: string[];
  };
  openGraph: {
    title: string;
    description: string;
  };
  image: {
    url: string;
    alt: string;
    width: number;
    height: number;
  } | null;
  structuredData?: string | null;
  noIndex?: boolean;
  noFollow?: boolean;
}
