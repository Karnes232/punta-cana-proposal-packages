import type { PortableTextBlock } from "@portabletext/react";

export interface PostBodyData {
  title: string;
  publishedAt: string;
  categoryTag: string;
  readingTime: number;
  excerpt: string;
  body: PortableTextBlock[];
}
