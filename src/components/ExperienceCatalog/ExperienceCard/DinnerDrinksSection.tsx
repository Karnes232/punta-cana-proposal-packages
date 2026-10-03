import { id, local } from "@/lib/experience/normalize";

import Accordion from "../Accordion";
import type { CardSectionProps } from "./types";

const WINE_TYPES = ["wine", "sparkling"];

/** Romantic dinners: welcome cocktails summary and shared drinks. */
export default function DinnerDrinksSection({
  experience,
  locale,
  t,
  money,
  state,
}: CardSectionProps) {
  const {
    guestMenus,
    cocktails,
    sharedDrinks,
    cocktailCount,
    selectedBeverages,
    setSelectedBeverages,
  } = state;
  const typeOf = (key: string) =>
    experience.beverages.find((beverage) => id(beverage) === key)?.type || "";

  return (
    <Accordion
      title={t("drinksWine")}
      summary={[
        `${cocktailCount} ${t("cocktails")}`,
        ...sharedDrinks
          .filter((drink) => selectedBeverages.includes(id(drink)))
          .map((drink) => local(drink.name, locale)),
      ].join(" · ")}
    >
      {cocktails.length > 0 && (
        <>
          <strong>{t("welcomeCocktail")}</strong>
          <small>{t("cocktailHint")}</small>
          {guestMenus.map((menu, guest) => (
            <small key={guest}>
              {t("guest")} {guest + 1}:{" "}
              {local(
                cocktails.find(
                  (cocktail) => id(cocktail) === menu.welcomeCocktail,
                )?.name,
                locale,
              ) || t("select")}
            </small>
          ))}
        </>
      )}
      {sharedDrinks.length > 0 && <p>{t("wineSelection")}</p>}
      {sharedDrinks.map((drink) => (
        <label className="ec-check" key={id(drink)}>
          <input
            type="checkbox"
            checked={selectedBeverages.includes(id(drink))}
            onChange={(event) =>
              setSelectedBeverages((current) =>
                event.target.checked
                  ? [
                      // Wine and sparkling wine are mutually exclusive.
                      ...current.filter(
                        (key) =>
                          !WINE_TYPES.includes(drink.type) ||
                          !WINE_TYPES.includes(typeOf(key)),
                      ),
                      id(drink),
                    ]
                  : current.filter((key) => key !== id(drink)),
              )
            }
          />
          {local(drink.name, locale)}{" "}
          {drink.included
            ? t("includedLabel")
            : `+${money(drink.supplementPrice || 0)}`}
        </label>
      ))}
    </Accordion>
  );
}
