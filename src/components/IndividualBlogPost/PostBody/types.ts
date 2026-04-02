import type { PortableTextBlock } from "@portabletext/react";

export interface PostSidebarContent {
  categoryLabelEn: string;
  categoryLabelEs: string;
  publishedLabelEn: string;
  publishedLabelEs: string;
  readTimeLabelEn: string;
  readTimeLabelEs: string;
  readTimeSuffixEn: string;
  readTimeSuffixEs: string;
  ctaLabelEn: string;
  ctaLabelEs: string;
  ctaHref: string;
}

export interface PostBodyData {
  title: string;
  publishedAt: string;
  categoryTag: string;
  readingTime: number;
  excerpt: string;
  body: PortableTextBlock[];
}

export const defaultPostSidebarContent: PostSidebarContent = {
  categoryLabelEn: "Category",
  categoryLabelEs: "Categoría",
  publishedLabelEn: "Published",
  publishedLabelEs: "Publicado",
  readTimeLabelEn: "Reading Time",
  readTimeLabelEs: "Tiempo de Lectura",
  readTimeSuffixEn: "min read",
  readTimeSuffixEs: "min de lectura",
  ctaLabelEn: "Start Planning Your Proposal",
  ctaLabelEs: "Comienza a Planificar Tu Propuesta",
  ctaHref: "/contact",
};
