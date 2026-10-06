import { jsonLdText, structuredData } from "@/lib/seo/structuredData";

/**
 * Server-rendered JSON-LD so crawlers receive schema in the initial HTML
 * (avoids next/script default deferral for structured data). Takes the
 * Studio's JSON text or an object.
 */
export default function JsonLd({ id, data }: { id?: string; data: unknown }) {
  const value = structuredData(data);
  if (value == null) {
    return null;
  }
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLdText(value) }}
    />
  );
}
