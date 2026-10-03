import type { PortableTextBlock } from "@portabletext/react";

export interface StoryBodyData {
  names: string;
  date: string; // pre-formatted string
  location: string;
  packageTag: string;
  quote: string;
  body: PortableTextBlock[];
}
