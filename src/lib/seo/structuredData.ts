/**
 * The empty Organization template the Studio's pages started with (no
 * name). The real Organization is built from Business info on every page,
 * so the template is dropped instead of printed blank.
 */
const isEmptyTemplate = (item: unknown) =>
  typeof item === "object" &&
  item !== null &&
  (item as Record<string, unknown>)["@type"] === "Organization" &&
  !(item as Record<string, unknown>).name;

/**
 * Structured data for a <script type="application/ld+json">: the Studio
 * stores it as JSON text, so text is parsed (invalid JSON is dropped);
 * objects and arrays pass through. Empty Organization templates are left
 * out.
 */
export function structuredData(data: unknown): unknown {
  if (data == null || data === "") return null;
  let value: unknown = data;
  if (typeof data === "string") {
    try {
      value = JSON.parse(data) as unknown;
    } catch {
      return null;
    }
  }
  if (Array.isArray(value)) {
    const items = value.filter((item) => !isEmptyTemplate(item));
    return items.length ? items : null;
  }
  return isEmptyTemplate(value) ? null : value;
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
