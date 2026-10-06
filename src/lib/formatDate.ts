/**
 * A date from Sanity, for display. A date field ("2024-12-01") is a
 * calendar day, so it's read and shown in UTC: otherwise visitors west of
 * UTC (Punta Cana is UTC-4) would see the day before. Empty or invalid
 * dates give "". The first letter is capitalised ("Diciembre de 2024").
 */
export function formatSanityDate(
  value: string | null | undefined,
  locale: string,
  options: Intl.DateTimeFormatOptions,
): string {
  if (!value) return "";
  const date = new Date(
    /^\d{4}-\d{2}-\d{2}$/.test(value) ? `${value}T00:00:00Z` : value,
  );
  if (Number.isNaN(date.getTime())) return "";
  const text = date.toLocaleDateString(locale, { ...options, timeZone: "UTC" });
  return text.charAt(0).toUpperCase() + text.slice(1);
}
