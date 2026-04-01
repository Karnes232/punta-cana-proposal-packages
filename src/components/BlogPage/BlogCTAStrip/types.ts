export interface BlogCTAStripContent {
    eyebrowEn: string;
    eyebrowEs: string;
    headingEn: string;
    headingEs: string;
    headingAccentEn: string;
    headingAccentEs: string;
    subheadingEn: string;
    subheadingEs: string;
    ctaLabelEn: string;
    ctaLabelEs: string;
    ctaHref: string;
  }
  
  export const defaultBlogCTAStripContent: BlogCTAStripContent = {
    eyebrowEn: "Ready to Begin",
    eyebrowEs: "Listo para Comenzar",
  
    headingEn: "Your Proposal",
    headingEs: "Tu Propuesta",
  
    headingAccentEn: "Starts Here",
    headingAccentEs: "Comienza Aquí",
  
    subheadingEn:
      "You have the inspiration. Let us handle the details. Explore our curated packages and start planning your unforgettable moment.",
    subheadingEs:
      "Ya tienes la inspiración. Déjanos encargarnos de los detalles. Explora nuestros paquetes y comienza a planificar tu momento inolvidable.",
  
    ctaLabelEn: "View Our Packages",
    ctaLabelEs: "Ver Nuestros Paquetes",
  
    ctaHref: "/classic-proposals",
  };