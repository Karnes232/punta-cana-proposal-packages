import type { Locale, Settings } from "@/lib/experience/types";

/**
 * Currency formatter for an experience. Uses the locale's number format and
 * swaps in the currency symbol configured in Catalog Settings, if any.
 */
export function moneyFormatter(
  locale: Locale,
  settings: Settings,
  currency = "USD",
) {
  const format = new Intl.NumberFormat(locale, { style: "currency", currency });
  const customSymbol =
    typeof settings.currencySymbol === "object"
      ? settings.currencySymbol?.[locale]
      : undefined;
  return (amount: number) =>
    format
      .formatToParts(amount)
      .map((part) =>
        part.type === "currency" ? customSymbol || part.value : part.value,
      )
      .join("");
}

export type Money = ReturnType<typeof moneyFormatter>;
