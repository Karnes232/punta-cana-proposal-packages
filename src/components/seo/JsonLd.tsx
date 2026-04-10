/**
 * Server-rendered JSON-LD so crawlers receive schema in the initial HTML
 * (avoids next/script default deferral for structured data).
 */
export default function JsonLd({ id, data }: { id?: string; data: unknown }) {
  if (data == null) {
    return null;
  }
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
