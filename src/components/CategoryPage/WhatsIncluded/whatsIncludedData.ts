// import { WhatsIncludedItemProps } from "./WhatsIncludedItem";

// type CategorySlug = "classic" | "modern" | "dining";

// const shared: Record<string, WhatsIncludedItemProps[]> = {
//   en: [
//     {
//       icon: "camera",
//       title: "Professional Photography",
//       description:
//         "A dedicated photographer captures every moment, from setup to the big yes.",
//     },
//     {
//       icon: "car",
//       title: "Private Transportation",
//       description:
//         "Round-trip transport from your hotel to the proposal location.",
//     },
//     {
//       icon: "wine",
//       title: "Sparkling Wine",
//       description: "A bottle of sparkling wine to toast the moment together.",
//     },
//     {
//       icon: "flower",
//       title: "Fresh Floral Bouquet",
//       description: "A hand-crafted bouquet of natural roses for your partner.",
//     },
//     {
//       icon: "clock",
//       title: "Private Beach Time",
//       description:
//         "Dedicated private hours on the beach for your proposal and celebration.",
//     },
//     {
//       icon: "candle",
//       title: "Romantic Decor",
//       description:
//         "Candles, lanterns, and rose petals — every detail set before you arrive.",
//     },
//   ],
//   es: [
//     {
//       icon: "camera",
//       title: "Fotografía Profesional",
//       description:
//         "Un fotógrafo dedicado captura cada momento, desde el montaje hasta el gran sí.",
//     },
//     {
//       icon: "car",
//       title: "Transporte Privado",
//       description:
//         "Transporte ida y vuelta desde tu hotel hasta la locación de la propuesta.",
//     },
//     {
//       icon: "wine",
//       title: "Vino Espumante",
//       description:
//         "Una botella de vino espumante para brindar juntos por el momento.",
//     },
//     {
//       icon: "flower",
//       title: "Bouquet de Flores Frescas",
//       description: "Un ramo artesanal de rosas naturales para tu pareja.",
//     },
//     {
//       icon: "clock",
//       title: "Tiempo Privado en la Playa",
//       description:
//         "Horas privadas dedicadas en la playa para tu propuesta y celebración.",
//     },
//     {
//       icon: "candle",
//       title: "Decoración Romántica",
//       description:
//         "Velas, faroles y pétalos de rosas — cada detalle listo antes de tu llegada.",
//     },
//   ],
// };

// const diningExtras: Record<string, WhatsIncludedItemProps[]> = {
//   en: [
//     {
//       icon: "utensils",
//       title: "Private Dinner",
//       description:
//         "A curated multi-course meal prepared by a private chef at your table.",
//     },
//     {
//       icon: "sparkles",
//       title: "Full Table Styling",
//       description:
//         "Elegant table setting with fine linens, glassware, and floral centerpiece.",
//     },
//   ],
//   es: [
//     {
//       icon: "utensils",
//       title: "Cena Privada",
//       description:
//         "Una comida de varios platos preparada por un chef privado en tu mesa.",
//     },
//     {
//       icon: "sparkles",
//       title: "Decoración de Mesa Completa",
//       description:
//         "Mesa elegante con mantelería fina, cristalería y centro de mesa floral.",
//     },
//   ],
// };

// export function getInclusionsForCategory(
//   category: CategorySlug,
//   locale: string,
// ): WhatsIncludedItemProps[] {
//   const lang = locale === "es" ? "es" : "en";
//   const base = shared[lang];

//   if (category === "dining") {
//     return [...base, ...diningExtras[lang]];
//   }

//   return base;
// }
