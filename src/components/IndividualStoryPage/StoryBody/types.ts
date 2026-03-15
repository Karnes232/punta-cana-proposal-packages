import type { PortableTextBlock } from "@portabletext/react";

export interface StorySidebarContent {
  packageLabelEn: string;
  packageLabelEs: string;
  dateLabelEn: string;
  dateLabelEs: string;
  locationLabelEn: string;
  locationLabelEs: string;
  ctaLabelEn: string;
  ctaLabelEs: string;
  ctaHref: string;
}

export interface StoryBodyData {
  names: string;
  date: string;           // pre-formatted string
  location: string;
  packageTag: string;
  quote: string;
  body: PortableTextBlock[];
}

export const defaultStorySidebarContent: StorySidebarContent = {
  packageLabelEn: "Package",
  packageLabelEs: "Paquete",
  dateLabelEn: "Proposed",
  dateLabelEs: "Propuesta",
  locationLabelEn: "Location",
  locationLabelEs: "Lugar",
  ctaLabelEn: "Book This Experience",
  ctaLabelEs: "Reserva Esta Experiencia",
  ctaHref: "/contact",
};