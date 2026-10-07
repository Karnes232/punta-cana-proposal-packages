import NextImage from "next/image";
import { local } from "@/lib/experience/normalize";
import type { Image, Locale } from "@/lib/experience/types";

/**
 * A Sanity photo that fills its (positioned) parent, with the alt text in
 * the visitor's language. Renders nothing without a file.
 */
export default function SanityPhoto({
  photo,
  locale,
  priority = false,
  className = "",
}: {
  photo?: Image;
  locale: Locale;
  priority?: boolean;
  className?: string;
}) {
  return photo?.url ? (
    <NextImage
      className={className}
      src={photo.url}
      alt={local(photo.alt, locale)}
      fill
      sizes={priority ? "100vw" : "(max-width: 700px) 100vw, 65vw"}
      priority={priority}
      quality={80}
    />
  ) : null;
}
