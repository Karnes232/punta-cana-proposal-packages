"use client";

import { useEffect } from "react";
import {
  useBlogLanguageAlternates,
  type BlogNavAlternate,
} from "./BlogLanguageAlternatesContext";

export type BlogPostSibling = { language: string; slug: string };

function toNavAlternates(siblings: BlogPostSibling[]): BlogNavAlternate[] {
  return siblings.map((s) => ({
    language: s.language,
    path: `/blog/${s.slug}`,
  }));
}

function serializeSiblings(s: BlogPostSibling[] | null): string {
  if (s == null) return "";
  return s.map((x) => `${x.language}:${x.slug}`).join("|");
}

/**
 * Registers blog post translation siblings for the navbar language switcher.
 * Clears on unmount or when siblings become null/empty.
 */
export default function RegisterBlogPostAlternates({
  siblings,
}: {
  siblings: BlogPostSibling[] | null;
}) {
  const { registerAlternates } = useBlogLanguageAlternates();
  const serialized = serializeSiblings(siblings);

  useEffect(() => {
    const hasAny = siblings != null && siblings.length > 0;
    registerAlternates(hasAny ? toNavAlternates(siblings) : null);
    return () => registerAlternates(null);
  }, [serialized, registerAlternates, siblings]);

  return null;
}
