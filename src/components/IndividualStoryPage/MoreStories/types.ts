export interface MoreStoriesStory {
  slug: string;
  names: string;
  date: string; // pre-formatted
  location: string;
  packageTag: string;
  quote: string;
  heroPhoto: {
    asset: {
      url: string;
      metadata: { dimensions: { width: number; height: number } };
    };
    alt?: string;
  };
}

// export interface MoreStoriesContent {
//   sectionLabelEn: string;
//   sectionLabelEs: string;
//   headingEn: string;
//   headingEs: string;
//   readMoreLabelEn: string;
//   readMoreLabelEs: string;
//   prevLabelEn: string;
//   prevLabelEs: string;
//   nextLabelEn: string;
//   nextLabelEs: string;
// }

// export const defaultMoreStoriesContent: MoreStoriesContent = {
//   sectionLabelEn: "More Stories",
//   sectionLabelEs: "Más Historias",
//   headingEn: "Same Package,",
//   headingEs: "Mismo Paquete,",
//   readMoreLabelEn: "Read Story",
//   readMoreLabelEs: "Leer Historia",
//   prevLabelEn: "Previous",
//   prevLabelEs: "Anterior",
//   nextLabelEn: "Next",
//   nextLabelEs: "Siguiente",
// };
