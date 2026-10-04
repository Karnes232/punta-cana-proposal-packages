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

/** The bilingual `seo` object (meta, Open Graph, robots) used by pages and stories. */
export const localizedSeoProjection = /* groq */ `
  seo {
    meta {
      en { title, description, keywords },
      es { title, description, keywords }
    },
    openGraph {
      en { title, description },
      es { title, description },
      "image": { ${seoImageFields} }
    },
    noIndex,
    noFollow
  }
`;
