import { defineType } from "sanity";
import { experienceFields, groups } from "./proposalExperience";
import {
  objects,
  refs,
  money,
  number,
  preview,
  validExperience,
  dinnerMenuComplete,
} from "./shared";
export default defineType({
  name: "romanticDinnerExperience",
  title: "Romantic Dinner",
  type: "document",
  groups: [
    ...groups,
    ...["menu", "beverages", "occasions", "capacity"].map((name) => ({
      name,
      title: name === "capacity" ? "CAPACITY & TIME" : name.toUpperCase(),
    })),
  ],
  initialValue: {
    active: false,
    basePrice: 849,
    currency: "USD",
    includedGuests: 2,
    minimumGuests: 2,
    additionalGuestPrice: 100,
    includedDurationMinutes: 120,
  },
  fields: [
    ...experienceFields.filter((f) => f.name !== "styles"),
    objects("styles", "dinnerStyle", "styles"),
    refs("occasions", "dinnerOccasion", "occasions", "active == true"),
    refs("menuItems", "menuItem", "menu", "active == true"),
    refs("beverages", "beverageOption", "beverages", "active == true"),
    number("includedGuests", "capacity"),
    number("minimumGuests", "capacity"),
    number("maximumGuests", "capacity"),
    money("additionalGuestPrice", "capacity"),
    number("includedDurationMinutes", "capacity"),
    number("maximumDurationMinutes", "capacity"),
  ],
  validation: (r) => [r.custom(validExperience), r.custom(dinnerMenuComplete)],
  preview,
});
