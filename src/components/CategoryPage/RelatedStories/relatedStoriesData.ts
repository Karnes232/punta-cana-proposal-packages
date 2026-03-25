import { RelatedStoryData } from "./RelatedStoryCard";

type CategorySlug = "classic" | "modern" | "dining";

export const RELATED_STORIES: Record<CategorySlug, RelatedStoryData[]> = {
  classic: [
    {
      slug: "sofia-and-daniel",
      names: "Sofía & Daniel",
      image: {
        asset: {
          url: `https://picsum.photos/800/1000?random=${Math.random()}`,
          metadata: {
            dimensions: {
              width: 800,
              height: 1000,
            },
          },
        },
        alt: "Sofía and Daniel proposal",
      },
      date: "October 2024",
      location: "Bávaro Beach",
      packageTag: "Classic Package",
      quote:
        "The sunset, the roses, the letters — it was everything I ever dreamed of and more.",
    },
    {
      slug: "lucia-and-marco",
      names: "Lucía & Marco",
      image: {
        asset: {
          url: `https://picsum.photos/800/1000?random=${Math.random()}`,
          metadata: {
            dimensions: {
              width: 800,
              height: 1000,
            },
          },
        },
        alt: "Lucía and Marco proposal",
      },
      date: "June 2024",
      location: "Hard Rock Punta Cana",
      packageTag: "Classic Package",
      quote:
        "He flew in my family from three countries to surprise me. I had absolutely no idea.",
    },
  ],
  modern: [
    {
      slug: "emily-and-james",
      names: "Emily & James",
      image: {
        asset: {
          url: `https://picsum.photos/800/1000?random=${Math.random()}`,
          metadata: {
            dimensions: {
              width: 800,
              height: 1000,
            },
          },
        },
        alt: "Emily and James proposal",
      },
      date: "August 2024",
      location: "Cap Cana",
      packageTag: "Modern Package",
      quote:
        "We wanted something that felt like us — minimal, clean, and unexpected. They nailed it.",
    },
    {
      slug: "ana-and-julian",
      names: "Ana & Julián",
      image: {
        asset: {
          url: `https://picsum.photos/800/1000?random=${Math.random()}`,
          metadata: {
            dimensions: {
              width: 800,
              height: 1000,
            },
          },
        },
        alt: "Ana and Julian proposal",
      },
      date: "November 2024",
      location: "Secrets Royal Beach",
      packageTag: "Modern Package",
      quote:
        "The neon sign, the pampas, the whole vibe — I said yes before he even finished the question.",
    },
  ],
  dining: [
    {
      slug: "maria-and-carlos",
      names: "María & Carlos",
      image: {
        asset: {
          url: `https://picsum.photos/800/1000?random=${Math.random()}`,
          metadata: {
            dimensions: {
              width: 800,
              height: 1000,
            },
          },
        },
        alt: "Maria and Carlos proposal",
      },
      date: "September 2024",
      location: "Private Beach, Bávaro",
      packageTag: "Dining Package",
      quote:
        "A private dinner on the beach under the stars — it felt like we were the only two people in the world.",
    },
    {
      slug: "rachel-and-tom",
      names: "Rachel & Tom",
      image: {
        asset: {
          url: `https://picsum.photos/800/1000?random=${Math.random()}`,
          metadata: {
            dimensions: {
              width: 800,
              height: 1000,
            },
          },
        },
        alt: "Rachel and Tom proposal",
      },
      date: "December 2024",
      location: "Sanctuary Cap Cana",
      packageTag: "Dining Package",
      quote:
        "The food was incredible, the setting was magical, and then he got down on one knee. Perfect.",
    },
  ],
};
