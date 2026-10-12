// The legal page's sections, for its "On this page" list and heading links.
// No path aliases: the tests compile this file on its own.
import type { PortableTextBlock } from "@portabletext/react";

/** A content block; headings carry the id their link jumps to. */
export type LegalBlock = PortableTextBlock & { anchor?: string };

export interface LegalSection {
  anchor: string;
  text: string;
}

/** A block's plain text. */
function blockText(block: PortableTextBlock) {
  return (block.children ?? [])
    .map((child) => ("text" in child ? String(child.text) : ""))
    .join("")
    .trim();
}

/** "Política de Cancelación" -> "politica-de-cancelacion". */
function slug(text: string) {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Gives every Heading 2 an anchor (its text as a slug, numbered when two
 * headings read the same) and lists them as the page's sections.
 */
export function legalSections(content: PortableTextBlock[] | null | undefined) {
  const sections: LegalSection[] = [];
  const used = new Map<string, number>();
  const blocks: LegalBlock[] = (content ?? []).map((block) => {
    const text = block.style === "h2" ? blockText(block) : "";
    if (!text) return block;
    const base = slug(text) || "section";
    const count = (used.get(base) ?? 0) + 1;
    used.set(base, count);
    const anchor = count > 1 ? `${base}-${count}` : base;
    sections.push({ anchor, text });
    return { ...block, anchor };
  });
  return { blocks, sections };
}
