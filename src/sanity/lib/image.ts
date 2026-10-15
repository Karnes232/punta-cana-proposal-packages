// The crop and hotspot editors set on an image in the Studio, applied on the
// site. Relative imports only: the tests compile this file.
import imageUrlBuilder from "@sanity/image-url";
import type { CSSProperties } from "react";

/** The part of the photo the Studio crop keeps, as 0–1 insets per side. */
export type ImageCrop = {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
};

/** The photo's subject: its centre (x, y) and size, as 0–1 of the photo. */
export type ImageHotspot = {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
};

/** What queries fetch next to an image's URL (null when never set). */
export type ImageFraming = {
  crop?: ImageCrop | null;
  hotspot?: ImageHotspot | null;
};

/** Sanity CDN image URLs: …/images/<project>/<dataset>/<file>. */
const cdnImage = /^https:\/\/cdn\.sanity\.io\/images\/([^/]+)\/([^/]+)\//;

/**
 * The image's builder, or none for a URL from anywhere else. The project and
 * dataset come from the URL itself, so this needs no client or env.
 */
function builderFor(url: string, framing?: ImageFraming | null) {
  const match = cdnImage.exec(url);
  if (!match) return null;
  return imageUrlBuilder({ projectId: match[1], dataset: match[2] }).image({
    asset: { url },
    crop: framing?.crop || undefined,
    hotspot: framing?.hotspot || undefined,
  });
}

/** The size social networks show link previews at. */
export const SHARE_IMAGE = { width: 1200, height: 630 } as const;

/** The image file with the Studio crop applied (unchanged without one). */
export function sanityImageUrl(
  url: string,
  framing?: ImageFraming | null,
): string {
  return builderFor(url, framing)?.url() ?? url;
}

/**
 * A 1200×630 share image (Open Graph, X), cut from the cropped photo
 * around its hotspot.
 */
export function shareImageUrl(
  url: string,
  framing?: ImageFraming | null,
): string {
  return (
    builderFor(url, framing)
      ?.width(SHARE_IMAGE.width)
      .height(SHARE_IMAGE.height)
      .fit("crop")
      .url() ?? url
  );
}

const clamp = (value: number) => Math.min(1, Math.max(0, value));

/**
 * The hotspot as a CSS position ("30% 42%") within the cropped photo, or
 * undefined without one, so the photo stays centred as before.
 */
export function focalPoint(framing?: ImageFraming | null): string | undefined {
  const { x, y } = framing?.hotspot ?? {};
  if (typeof x !== "number" || typeof y !== "number") return undefined;
  const { top = 0, bottom = 0, left = 0, right = 0 } = framing?.crop ?? {};
  const across = (x - left) / (1 - left - right || 1);
  const down = (y - top) / (1 - top - bottom || 1);
  const percent = (value: number) => `${+(clamp(value) * 100).toFixed(2)}%`;
  return `${percent(across)} ${percent(down)}`;
}

/**
 * `src` and `style` for an image that fills a box (object-cover): the cropped
 * file, positioned on the hotspot. Zooms and hover scales grow from it too,
 * so the subject stays in frame. Spread onto next/image.
 */
export function framedImage(
  url: string,
  framing?: ImageFraming | null,
): { src: string; style?: CSSProperties } {
  const position = focalPoint(framing);
  return {
    src: sanityImageUrl(url, framing),
    style: position
      ? { objectPosition: position, transformOrigin: position }
      : undefined,
  };
}
