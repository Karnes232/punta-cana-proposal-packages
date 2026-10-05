import { id, local } from "@/lib/experience/normalize";

import Accordion from "../Accordion";
import type { CardSectionProps } from "./types";
import { COURSES } from "./useExperienceSelection";

/** Romantic dinners: a menu (and welcome cocktail) for each guest. */
export default function DinnerMenuSection({
  experience,
  locale,
  t,
  money,
  state,
}: CardSectionProps) {
  const {
    guestCount,
    guestMenus,
    setGuestOption,
    isMenuComplete,
    completedMenus,
    cocktails,
  } = state;

  return (
    <Accordion
      title={t("foodMenu")}
      summary={`${completedMenus} / ${guestCount} ${t("menusCompleted")}`}
    >
      <div className="block pl-3" data-testid="guest-menus">
        {Array.from({ length: guestCount }, (_, guest) => (
          <Accordion
            key={guest}
            title={`${t("guest")} ${guest + 1}`}
            summary={
              isMenuComplete(guest) ? t("menuSelected") : t("chooseMenu")
            }
          >
            {COURSES.map((course) => {
              const items = experience.menuItems.filter(
                (item) => item.courseType === course,
              );
              const chosen = items.find(
                (item) => id(item) === guestMenus[guest]?.[course],
              );
              return (
                <label key={course}>
                  {t(course)}
                  <select
                    disabled={!items.length}
                    value={guestMenus[guest]?.[course] || ""}
                    onChange={(event) =>
                      setGuestOption(guest, course, event.target.value)
                    }
                  >
                    <option value="">{t("select")}</option>
                    {items.map((item) => (
                      <option key={id(item)} value={id(item)}>
                        {local(item.name, locale)}
                        {item.dietaryType === "vegan"
                          ? " · Ve"
                          : item.dietaryType === "vegetarian"
                            ? " · V"
                            : ""}
                        {item.included
                          ? ""
                          : ` (+${money(item.supplementPrice || 0)})`}
                      </option>
                    ))}
                  </select>
                  {chosen && (
                    <small>
                      {chosen.dietaryType &&
                        chosen.dietaryType !== "regular" && (
                          <span
                            className="mr-[5px] inline-block bg-[#f3ecde] px-1.5 py-0.5 text-[#534426]"
                            title={t(chosen.dietaryType)}
                            data-testid="dietary"
                          >
                            {chosen.dietaryType === "vegan" ? "Ve" : "V"} ·{" "}
                            {t(chosen.dietaryType)}
                          </span>
                        )}{" "}
                      {local(chosen.description, locale)}{" "}
                      {chosen.dietaryTags?.join(" · ")}{" "}
                      {local(chosen.allergenInformation, locale)}
                    </small>
                  )}
                </label>
              );
            })}
            {cocktails.length > 0 && (
              <label>
                {t("welcomeCocktail")}
                <select
                  value={guestMenus[guest]?.welcomeCocktail || ""}
                  onChange={(event) =>
                    setGuestOption(guest, "welcomeCocktail", event.target.value)
                  }
                >
                  <option value="">{t("select")}</option>
                  {cocktails.map((cocktail) => (
                    <option key={id(cocktail)} value={id(cocktail)}>
                      {local(cocktail.name, locale)} ·{" "}
                      {cocktail.included
                        ? t("includedLabel")
                        : "+" + money(cocktail.supplementPrice || 0)}
                    </option>
                  ))}
                </select>
              </label>
            )}
          </Accordion>
        ))}
      </div>
    </Accordion>
  );
}
