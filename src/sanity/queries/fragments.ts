// GROQ pieces shared by the site's page queries (blog, stories, FAQ, SEO…).
// The experience catalog has its own in ./ExperienceCatalog/fragments.ts.

/** Image fields: asset URL, pixel width/height and alt text. */
export const imageWithDimensions = /* groq */ `
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
`;

/** A document SEO object's Open Graph image, flattened for metadata. */
export const seoImageFields = /* groq */ `
  "url": image.asset->url,
  "alt": image.alt,
  "width": image.asset->metadata.dimensions.width,
  "height": image.asset->metadata.dimensions.height
`;

/** A per-language document's `seo` object (see ./SEO/documentSeo.ts). */
export const documentSeoProjection = /* groq */ `seo {
  meta {
    title,
    description,
    keywords
  },
  openGraph {
    title,
    description
  },
  "image": select(
    defined(image.asset._ref) => {
      ${seoImageFields}
    }
  ),
  structuredData,
  noIndex,
  noFollow
}`;

/**
 * A post or story a list can show: it has a URL and a hero photo file.
 * Documents created outside the Studio can lack either; lists skip them
 * instead of breaking the page.
 */
export const listable = /* groq */ `defined(slug.current) && defined(heroPhoto.asset)`;
