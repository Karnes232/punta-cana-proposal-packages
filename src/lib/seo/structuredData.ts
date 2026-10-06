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

/**
 * JSON-LD as text that is safe inside a <script>: `<`, `>`, `&` and the
 * line/paragraph separators are written as \u escapes, so text from the
 * CMS (e.g. "</script>") can't end the script early. Still valid JSON.
 */
export function jsonLdText(value: unknown): string {
  return JSON.stringify(value).replace(
    /[<>&\u2028\u2029]/g,
    (char) => `\\u${char.charCodeAt(0).toString(16).padStart(4, "0")}`,
  );
}
