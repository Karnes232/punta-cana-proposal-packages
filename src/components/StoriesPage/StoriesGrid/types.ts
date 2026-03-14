export interface StoryCardImage {
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
  
  export interface StoryCardData {
    slug: string;
    names: string;
    date: string;
    location: string;
    packageTag: string;
    quote: string;
    /** Sanity package type slug — used for client-side filtering */
    packageType: string;
    photo: StoryCardImage;
  }
  
  export interface StoriesGridContent {
    readMoreLabelEn: string;
    readMoreLabelEs: string;
    loadMoreLabelEn: string;
    loadMoreLabelEs: string;
    sectionEyebrowEn: string;
    sectionEyebrowEs: string;
  }
  
  export const defaultStoriesGridContent: StoriesGridContent = {
    readMoreLabelEn: "Read Story",
    readMoreLabelEs: "Leer Historia",
    loadMoreLabelEn: "Load More Stories",
    loadMoreLabelEs: "Ver Más Historias",
    sectionEyebrowEn: "More Stories",
    sectionEyebrowEs: "Más Historias",
  };
  
  export const defaultStories: StoryCardData[] = [
    {
      slug: "isabelle-and-marcus",
      names: "Isabelle & Marcus",
      date: "November 2024",
      location: "Cap Cana",
      packageTag: "Modern Package",
      packageType: "modern",
      quote:
        "The rooftop setup was breathtaking — candles everywhere, the ocean in the distance. I keep replaying it.",
      photo: {
        asset: {
          url: "https://picsum.photos/800/1000?random=1",
          metadata: { dimensions: { width: 800, height: 1000 } },
        },
        alt: "Isabelle and Marcus proposal at Cap Cana",
      },
    },
    {
      slug: "valentina-and-rodrigo",
      names: "Valentina & Rodrigo",
      date: "October 2024",
      location: "Barceló Bávaro",
      packageTag: "Dining Package",
      packageType: "dining",
      quote:
        "A private dinner on the beach, a violinist, and a ring I still can't stop staring at.",
      photo: {
        asset: {
          url: "https://picsum.photos/1200/800?random=6",
          metadata: { dimensions: { width: 1200, height: 800 } },
        },
        alt: "Valentina and Rodrigo romantic dinner proposal",
      },
    },
    {
      slug: "emily-and-daniel",
      names: "Emily & Daniel",
      date: "September 2024",
      location: "Punta Cana Resort",
      packageTag: "Classic Package",
      packageType: "classic",
      quote:
        "I walked down to what I thought was a sunset stroll. He'd arranged an entire setup just for us.",
      photo: {
        asset: {
          url: "https://picsum.photos/1200/800?random=5",
          metadata: { dimensions: { width: 1200, height: 800 } },
        },
        alt: "Emily and Daniel sunset proposal",
      },
    },
    {
      slug: "camila-and-tomas",
      names: "Camila & Tomás",
      date: "August 2024",
      location: "Juanillo Beach",
      packageTag: "Beach Package",
      packageType: "beach",
      quote: "We both cried. Even the photographer cried.",
      photo: {
        asset: {
          url: "https://picsum.photos/800/1000?random=4",
          metadata: { dimensions: { width: 800, height: 1000 } },
        },
        alt: "Camila and Tomas beach proposal at Juanillo",
      },
    },
    {
      slug: "ana-and-julian",
      names: "Ana & Julián",
      date: "July 2024",
      location: "Bávaro Lagoon",
      packageTag: "Modern Package",
      packageType: "modern",
      quote:
        "Everything was so perfectly us — the flowers, the music, the light. I said yes before he even finished the question.",
      photo: {
        asset: {
          url: "https://picsum.photos/800/1000?random=2",
          metadata: { dimensions: { width: 800, height: 1000 } },
        },
        alt: "Ana and Julian lagoon proposal",
      },
    },
    {
      slug: "lucia-and-marco",
      names: "Lucía & Marco",
      date: "June 2024",
      location: "Hard Rock Punta Cana",
      packageTag: "Classic Package",
      packageType: "classic",
      quote:
        "He flew in my family from three countries to surprise me. I had absolutely no idea.",
      photo: {
        asset: {
          url: "https://picsum.photos/1200/800?random=3",
          metadata: { dimensions: { width: 1200, height: 800 } },
        },
        alt: "Lucia and Marco classic proposal",
      },
    },
    {
      slug: "isabelle-and-marcus",
      names: "Isabelle & Marcus",
      date: "November 2024",
      location: "Cap Cana",
      packageTag: "Modern Package",
      packageType: "modern",
      quote:
        "The rooftop setup was breathtaking — candles everywhere, the ocean in the distance. I keep replaying it.",
      photo: {
        asset: {
          url: "https://picsum.photos/800/1000?random=1",
          metadata: { dimensions: { width: 800, height: 1000 } },
        },
        alt: "Isabelle and Marcus proposal at Cap Cana",
      },
    },
    {
      slug: "valentina-and-rodrigo",
      names: "Valentina & Rodrigo",
      date: "October 2024",
      location: "Barceló Bávaro",
      packageTag: "Dining Package",
      packageType: "dining",
      quote:
        "A private dinner on the beach, a violinist, and a ring I still can't stop staring at.",
      photo: {
        asset: {
          url: "https://picsum.photos/1200/800?random=6",
          metadata: { dimensions: { width: 1200, height: 800 } },
        },
        alt: "Valentina and Rodrigo romantic dinner proposal",
      },
    },
    {
      slug: "emily-and-daniel",
      names: "Emily & Daniel",
      date: "September 2024",
      location: "Punta Cana Resort",
      packageTag: "Classic Package",
      packageType: "classic",
      quote:
        "I walked down to what I thought was a sunset stroll. He'd arranged an entire setup just for us.",
      photo: {
        asset: {
          url: "https://picsum.photos/1200/800?random=5",
          metadata: { dimensions: { width: 1200, height: 800 } },
        },
        alt: "Emily and Daniel sunset proposal",
      },
    },
    {
      slug: "camila-and-tomas",
      names: "Camila & Tomás",
      date: "August 2024",
      location: "Juanillo Beach",
      packageTag: "Beach Package",
      packageType: "beach",
      quote: "We both cried. Even the photographer cried.",
      photo: {
        asset: {
          url: "https://picsum.photos/800/1000?random=4",
          metadata: { dimensions: { width: 800, height: 1000 } },
        },
        alt: "Camila and Tomas beach proposal at Juanillo",
      },
    },
    {
      slug: "ana-and-julian",
      names: "Ana & Julián",
      date: "July 2024",
      location: "Bávaro Lagoon",
      packageTag: "Modern Package",
      packageType: "modern",
      quote:
        "Everything was so perfectly us — the flowers, the music, the light. I said yes before he even finished the question.",
      photo: {
        asset: {
          url: "https://picsum.photos/800/1000?random=2",
          metadata: { dimensions: { width: 800, height: 1000 } },
        },
        alt: "Ana and Julian lagoon proposal",
      },
    },
    {
      slug: "lucia-and-marco",
      names: "Lucía & Marco",
      date: "June 2024",
      location: "Hard Rock Punta Cana",
      packageTag: "Classic Package",
      packageType: "classic",
      quote:
        "He flew in my family from three countries to surprise me. I had absolutely no idea.",
      photo: {
        asset: {
          url: "https://picsum.photos/1200/800?random=3",
          metadata: { dimensions: { width: 1200, height: 800 } },
        },
        alt: "Lucia and Marco classic proposal",
      },
    },
  ];