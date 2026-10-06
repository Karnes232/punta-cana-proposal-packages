/**
 * Structured data for a <script type="application/ld+json">: the Studio
 * stores it as JSON text, so text is parsed (invalid JSON is dropped);
 * objects and arrays pass through.
 */
export function structuredData(data: unknown): unknown {
  if (data == null || data === "") return null;
  if (typeof data !== "string") return data;
  try {
    return JSON.parse(data) as unknown;
  } catch {
    return null;
  }
}
