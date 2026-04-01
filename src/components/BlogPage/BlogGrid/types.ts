export interface BlogCardImage {
    asset: {
      url: string;
      metadata: {
        dimensions: {
          width: number;
          height: number;
        };
      };
    };
    alt?: string;
  }
  
  export interface BlogCardData {
    slug: string;
    title: string;
    publishedAt: string;
    categoryTag: string;
    excerpt: string;
    readingTime: number;
    /** Sanity category slug — used for client-side filtering */
    categoryType: string;
    photo: BlogCardImage;
  }
  
  export interface BlogGridContent {
    readMoreLabelEn: string;
    readMoreLabelEs: string;
    loadMoreLabelEn: string;
    loadMoreLabelEs: string;
    sectionEyebrowEn: string;
    sectionEyebrowEs: string;
    readTimeSuffixEn: string;
    readTimeSuffixEs: string;
  }
  
  export const defaultBlogGridContent: BlogGridContent = {
    readMoreLabelEn: "Read Article",
    readMoreLabelEs: "Leer Artículo",
    loadMoreLabelEn: "Load More Posts",
    loadMoreLabelEs: "Ver Más Artículos",
    sectionEyebrowEn: "Latest Posts",
    sectionEyebrowEs: "Últimos Artículos",
    readTimeSuffixEn: "min read",
    readTimeSuffixEs: "min de lectura",
  };
  
  export const defaultBlogPosts: BlogCardData[] = [
    {
      slug: "the-ultimate-guide-to-planning-a-proposal-in-punta-cana",
      title: "The Ultimate Guide to Planning a Proposal in Punta Cana",
      publishedAt: "2025-03-15",
      categoryTag: "Planning Tips",
      categoryType: "planning-tips",
      excerpt:
        "From choosing the perfect beach to coordinating florals, photography, and the element of surprise — everything you need to plan a flawless Caribbean proposal.",
      readingTime: 8,
      photo: {
        asset: {
          url: "https://picsum.photos/800/1000?random=10",
          metadata: { dimensions: { width: 800, height: 1000 } },
        },
        alt: "Romantic proposal setup on Playa Bávaro at golden hour",
      },
    },
    {
      slug: "5-punta-cana-beaches-perfect-for-a-private-proposal",
      title: "5 Punta Cana Beaches Perfect for a Private Proposal",
      publishedAt: "2025-02-28",
      categoryTag: "Destination Guides",
      categoryType: "destination-guides",
      excerpt:
        "Not every stretch of sand is made for a proposal. These five beaches combine privacy, natural beauty, and the kind of light that makes everything feel cinematic.",
      readingTime: 6,
      photo: {
        asset: {
          url: "https://picsum.photos/1200/800?random=11",
          metadata: { dimensions: { width: 1200, height: 800 } },
        },
        alt: "Aerial view of a secluded cove along the Punta Cana coastline",
      },
    },
    {
      slug: "how-to-choose-the-right-proposal-photographer",
      title: "How to Choose the Right Proposal Photographer",
      publishedAt: "2025-02-10",
      categoryTag: "Vendor Spotlights",
      categoryType: "vendor-spotlights",
      excerpt:
        "Your photographer captures the moment you will relive forever. Here is what to look for — and the questions most people forget to ask.",
      readingTime: 5,
      photo: {
        asset: {
          url: "https://picsum.photos/1200/800?random=12",
          metadata: { dimensions: { width: 1200, height: 800 } },
        },
        alt: "Photographer capturing a couple on the beach at sunset",
      },
    },
    {
      slug: "a-golden-hour-proposal-at-cap-cana",
      title: "A Golden Hour Proposal at Cap Cana",
      publishedAt: "2025-01-22",
      categoryTag: "Real Proposals",
      categoryType: "real-proposals",
      excerpt:
        "When Tomás planned a surprise proposal at Juanillo Beach, he had no idea the sunset would steal the show. Here is how it all came together.",
      readingTime: 4,
      photo: {
        asset: {
          url: "https://picsum.photos/800/1000?random=13",
          metadata: { dimensions: { width: 800, height: 1000 } },
        },
        alt: "Couple embracing after a sunset proposal at Cap Cana",
      },
    },
    {
      slug: "proposal-florals-what-works-on-the-beach",
      title: "Proposal Florals: What Works on the Beach",
      publishedAt: "2025-01-08",
      categoryTag: "Planning Tips",
      categoryType: "planning-tips",
      excerpt:
        "Salt air, wind, and humidity are not kind to every bloom. These are the arrangements that thrive — and the ones to avoid.",
      readingTime: 5,
      photo: {
        asset: {
          url: "https://picsum.photos/800/1000?random=14",
          metadata: { dimensions: { width: 800, height: 1000 } },
        },
        alt: "Tropical floral arch on white sand beach",
      },
    },
    {
      slug: "punta-cana-vs-cancun-for-your-proposal",
      title: "Punta Cana vs. Cancún: Which Is Better for Your Proposal?",
      publishedAt: "2024-12-18",
      categoryTag: "Destination Guides",
      categoryType: "destination-guides",
      excerpt:
        "Both destinations promise turquoise water and golden light — but the experience on the ground is very different. Here is how they compare.",
      readingTime: 7,
      photo: {
        asset: {
          url: "https://picsum.photos/1200/800?random=15",
          metadata: { dimensions: { width: 1200, height: 800 } },
        },
        alt: "Split view of Punta Cana and Cancún coastlines",
      },
    },
  ];