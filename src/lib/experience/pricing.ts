import type { Experience, Selection, Course } from "./types";
import { proposalDinnerId } from "./proposalExtras";
const courses: Course[] = ["starter", "main", "dessert"];
const identity = (v: { _id?: string; _key?: string }) => v._id || v._key;
function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}
function cents(value: unknown) {
  assert(
    typeof value === "number" && Number.isFinite(value) && value >= 0,
    "Price unavailable",
  );
  const n = Math.round(value * 100);
  assert(Number.isSafeInteger(n), "Price out of range");
  return n;
}
export function calculate(
  e: Experience,
  s: Selection,
  complete = false,
  requestOnly = false,
) {
  assert(e.active === true, "Experience inactive");
  assert(
    s &&
      typeof s === "object" &&
      s.addons &&
      typeof s.addons === "object" &&
      !Array.isArray(s.addons),
    "Invalid selection",
  );
  assert(
    Array.isArray(s.guestMenus) && Array.isArray(s.beverages),
    "Invalid selection",
  );
  assert(
    Number.isSafeInteger(s.guestCount) && s.guestCount > 0,
    "Invalid guest count",
  );
  const dinner = e._type === "romanticDinnerExperience";
  const styles = e.styles.filter((v) => v.active);
  const style = styles.find((v) => identity(v) === s.selectedStyleId);
  assert(!s.selectedStyleId || style, "Invalid style");
  if (complete && styles.length) assert(style, "Select a style");
  let total = cents(dinner ? e.basePrice : style ? style.price : e.basePrice);
  const lines = [{ kind: "base", amount: total / 100 }];
  const add = (kind: string, value: number) => {
    total += value;
    lines.push({ kind, amount: value / 100 });
  };
  let duration = e.includedDurationMinutes || 0;
  let quoteRequired = false;
  if (dinner) {
    assert(
      Number.isInteger(e.includedGuests) &&
        Number(e.includedGuests) > 0 &&
        (Number.isInteger(e.maximumGuests) ||
          ((!complete || requestOnly) && e.maximumGuests == null)),
      "Guest configuration unavailable",
    );
    assert(
      s.guestCount >= Number(e.minimumGuests ?? e.includedGuests) &&
        ((requestOnly && e.maximumGuests == null) ||
          s.guestCount <= Number(e.maximumGuests ?? e.includedGuests)),
      "Guest limit exceeded",
    );
    if (requestOnly && e.maximumGuests == null) quoteRequired = true;
    if (complete)
      assert(s.guestMenus.length === s.guestCount, "Select each guest course");
    const extra = Math.max(0, s.guestCount - Number(e.includedGuests));
    if (extra) add("guests", extra * cents(e.additionalGuestPrice));
    assert(s.guestMenus.length <= s.guestCount, "Invalid guest menus");
    for (let i = 0; i < s.guestCount; i++)
      for (const course of courses) {
        const options = e.menuItems.filter(
          (v) => v.active && v.courseType === course,
        );
        const selected = s.guestMenus[i]?.[course];
        if (complete)
          assert(
            options.length > 0,
            "Three-course menu configuration unavailable",
          );
        if (complete && options.length)
          assert(selected, "Select each guest course");
        if (!selected) continue;
        const item = options.find((v) => identity(v) === selected);
        assert(item, "Invalid menu item");
        add(
          `menu:${i}:${selected}`,
          item.included ? 0 : cents(item.supplementPrice),
        );
      }
    const cocktails = e.beverages.filter(
      (v) => v.active && v.type === "welcomeDrink",
    );
    for (let i = 0; i < s.guestCount; i++) {
      const selected = s.guestMenus[i]?.welcomeCocktail;
      if (complete && cocktails.length)
        assert(selected, "Select each guest cocktail");
      if (!selected) continue;
      const drink = cocktails.find((v) => identity(v) === selected);
      assert(drink, "Invalid guest cocktail");
      add(
        `beverage:guest:${i}:${selected}`,
        drink.included ? 0 : cents(drink.supplementPrice),
      );
    }
    assert(
      new Set(s.beverages).size === s.beverages.length,
      "Duplicate beverages",
    );
    assert(
      s.beverages.filter((key) =>
        e.beverages.some(
          (b) => identity(b) === key && ["wine", "sparkling"].includes(b.type),
        ),
      ).length <= 1,
      "Select one wine per experience",
    );
    for (const selected of s.beverages) {
      const b = e.beverages.find(
        (v) =>
          v.active && v.type !== "welcomeDrink" && identity(v) === selected,
      );
      assert(b, "Invalid beverage");
      add(`beverage:${selected}`, b.included ? 0 : cents(b.supplementPrice));
    }
    const occasion = e.occasions.find(
      (v) => v.active && identity(v) === s.selectedOccasionId,
    );
    assert(!s.selectedOccasionId || occasion, "Invalid occasion");
    assert(
      !s.customOccasion || !occasion || occasion.allowCustomMessage,
      "Custom message unavailable",
    );
    assert(
      !s.customOccasion ||
        (typeof s.customOccasion === "string" &&
          s.customOccasion.length <= 500),
      "Invalid occasion text",
    );
  } else {
    assert(
      s.guestCount === 1 &&
        (s.addons[proposalDinnerId]
          ? s.guestMenus.length <= 2
          : s.guestMenus.length === 0) &&
        s.beverages.length === 0 &&
        !s.selectedOccasionId &&
        !s.customOccasion,
      "Dinner fields are invalid for proposals",
    );
  }
  if (!dinner && s.addons[proposalDinnerId]) {
    if (complete)
      assert(s.guestMenus.length === 2, "Select the menu for two guests");
    for (let i = 0; i < 2; i++) {
      assert(
        !s.guestMenus[i]?.welcomeCocktail,
        "Cocktail unavailable for this addon",
      );
      for (const course of courses) {
        const selected = s.guestMenus[i]?.[course];
        if (complete) assert(selected, "Select each guest course");
        if (!selected) continue;
        const item = e.menuItems.find(
          (v) =>
            v.active && v.courseType === course && identity(v) === selected,
        );
        assert(item, "Invalid menu item");
        add(
          `menu:${i}:${selected}`,
          item.included ? 0 : cents(item.supplementPrice),
        );
      }
    }
  }
  for (const [selected, quantity] of Object.entries(s.addons)) {
    const a = e.availableAddons.find(
      (v) =>
        v.active &&
        identity(v) === selected &&
        v.applicableTo?.includes(dinner ? "romanticDinner" : "proposal"),
    );
    assert(a, "Invalid addon");
    assert(
      Number.isInteger(quantity) &&
        quantity >= Math.max(1, a.minimumQuantity ?? 1) &&
        quantity <= (a.maximumQuantity ?? 100),
      "Invalid addon quantity",
    );
    if (a.pricingType === "fixed" || a.pricingType === "perPerson")
      assert(quantity === 1, "Invalid fixed addon quantity");
    if (a.pricingType === "quoteOnly") quoteRequired = true;
    else {
      assert(
        ["fixed", "perPerson", "perUnit", "perHour", "per30Minutes"].includes(
          a.pricingType,
        ),
        "Invalid addon pricing",
      );
      add(
        `addon:${selected}`,
        cents(a.price) *
          (a.pricingType === "perPerson" ? s.guestCount : quantity),
      );
    }
    if (a.durationMinutesPerUnit) {
      assert(
        dinner &&
          Number.isInteger(a.durationMinutesPerUnit) &&
          a.durationMinutesPerUnit > 0,
        "Invalid duration addon",
      );
      duration += a.durationMinutesPerUnit * quantity;
    }
  }
  if (dinner)
    assert(
      Number.isInteger(duration) &&
        duration > 0 &&
        duration <=
          Number(
            e.maximumDurationMinutes ??
              (!complete || requestOnly
                ? e.includedDurationMinutes
                : undefined),
          ),
      "Duration limit exceeded",
    );
  assert(Number.isSafeInteger(total), "Total out of range");
  return {
    estimatedTotal: total / 100,
    currency: e.currency || "USD",
    quoteRequired,
    durationMinutes: duration,
    lines,
  };
}
