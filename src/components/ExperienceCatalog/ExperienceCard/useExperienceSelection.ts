import { useState } from "react";

import { id, local } from "@/lib/experience/normalize";
import { calculate } from "@/lib/experience/pricing";
import { proposalDinnerId } from "@/lib/experience/proposalExtras";
import type {
  Course,
  Experience,
  Locale,
  Selection,
} from "@/lib/experience/types";

export const COURSES: Course[] = ["starter", "main", "dessert"];

/**
 * Everything a visitor chooses on an experience card (style, add-ons,
 * guests, menus, drinks, occasion) plus the price estimate for it.
 */
export function useExperienceSelection(
  experience: Experience,
  locale: Locale,
  demo: boolean,
) {
  const dinner = experience._type === "romanticDinnerExperience";
  const [selectedStyleId, setSelectedStyleId] = useState(
    id(experience.styles[0] || {}),
  );
  const [selectedAddons, setSelectedAddons] = useState<Record<string, number>>(
    {},
  );
  const [guestCount, setGuestCount] = useState(
    dinner ? experience.includedGuests || 2 : 1,
  );
  const [guestMenus, setGuestMenus] = useState<Selection["guestMenus"]>([]);
  const [selectedBeverages, setSelectedBeverages] = useState<string[]>([]);
  const [selectedOccasionId, setSelectedOccasionId] = useState("");
  const [customOccasion, setCustomOccasion] = useState("");

  const style = experience.styles.find(
    (candidate) => id(candidate) === selectedStyleId,
  );
  const cocktails = experience.beverages.filter(
    (beverage) => beverage.type === "welcomeDrink",
  );
  const sharedDrinks = experience.beverages.filter(
    (beverage) => beverage.type !== "welcomeDrink",
  );
  const occasion = experience.occasions.find(
    (candidate) => id(candidate) === selectedOccasionId,
  );

  const isMenuComplete = (guest: number) =>
    COURSES.every((course) => !!guestMenus[guest]?.[course]) &&
    (!cocktails.length || !!guestMenus[guest]?.welcomeCocktail);
  const completedMenus = Array.from({ length: guestCount }, (_, guest) =>
    isMenuComplete(guest),
  ).filter(Boolean).length;
  const cocktailCount = guestMenus.filter(
    (menu) => menu.welcomeCocktail,
  ).length;
  const selectedAddonNames = experience.availableAddons
    .filter((addon) => selectedAddons[id(addon)])
    .map((addon) => local(addon.name, locale));

  const changeGuestCount = (count: number) => {
    setGuestCount(count);
    setGuestMenus((menus) => menus.slice(0, count));
  };
  const setGuestOption = (
    guest: number,
    key: Course | "welcomeCocktail",
    value: string,
  ) =>
    setGuestMenus((menus) =>
      Array.from({ length: guestCount }, (_, index) =>
        index === guest
          ? { ...menus[index], [key]: value }
          : { ...menus[index] },
      ),
    );

  const selection: Selection = {
    selectedStyleId: selectedStyleId || undefined,
    addons: selectedAddons,
    guestCount,
    guestMenus: dinner || selectedAddons[proposalDinnerId] ? guestMenus : [],
    beverages: selectedBeverages,
    selectedOccasionId: selectedOccasionId || undefined,
    customOccasion: customOccasion || undefined,
  };

  let estimate: ReturnType<typeof calculate> | undefined;
  try {
    estimate = calculate(experience, selection, false, dinner);
  } catch {}
  let ready = true;
  try {
    calculate(experience, selection, true, dinner);
  } catch {
    ready = false;
  }

  /** Set an add-on's quantity (0 removes it), if the price still works out. */
  function changeAddon(key: string, quantity: number) {
    const next = { ...selectedAddons };
    if (quantity) next[key] = quantity;
    else delete next[key];
    try {
      if (demo) {
        setSelectedAddons(next);
        return;
      }
      calculate(
        experience,
        {
          ...selection,
          addons: next,
          guestMenus: dinner || next[proposalDinnerId] ? guestMenus : [],
        },
        false,
        dinner,
      );
      setSelectedAddons(next);
    } catch {}
  }

  return {
    dinner,
    style,
    selectedStyleId,
    setSelectedStyleId,
    selectedAddons,
    changeAddon,
    guestCount,
    changeGuestCount,
    guestMenus,
    setGuestMenus,
    setGuestOption,
    isMenuComplete,
    completedMenus,
    cocktails,
    sharedDrinks,
    cocktailCount,
    selectedBeverages,
    setSelectedBeverages,
    occasion,
    selectedOccasionId,
    setSelectedOccasionId,
    customOccasion,
    setCustomOccasion,
    selectedAddonNames,
    selection,
    estimate,
    ready,
  };
}

export type ExperienceSelection = ReturnType<typeof useExperienceSelection>;
