import { defineType, defineField } from "sanity";
import {
  field,
  named,
  image,
  money,
  number,
  options,
  validActive,
} from "./shared";
export default defineType({
  name: "experienceAddon",
  type: "document",
  fields: [
    field("internalTitle"),
    ...named,
    money("price"),
    options("pricingType", [
      "fixed",
      "perPerson",
      "perUnit",
      "perHour",
      "per30Minutes",
      "quoteOnly",
    ]),
    defineField({
      name: "applicableTo",
      type: "array",
      of: [{ type: "string" }],
      options: { list: ["proposal", "romanticDinner"] },
    }),
    image("image"),
    field("icon"),
    number("minimumQuantity"),
    number("maximumQuantity"),
    number("durationMinutesPerUnit"),
    field("internalNotes", "text"),
  ],
  validation: (r) =>
    r.custom((v) => {
      const check = validActive(v);
      if (check !== true) return check;
      if (Number(v?.maximumQuantity) < Number(v?.minimumQuantity))
        return "Maximum quantity must be at least minimum";
      if (
        v?.active &&
        (!v.pricingType ||
          !Array.isArray(v.applicableTo) ||
          !v.applicableTo.length ||
          (v.pricingType !== "quoteOnly" && typeof v.price !== "number"))
      )
        return "Configure applicability, pricing type and price";
      return true;
    }),
  preview: {
    select: { title: "name.en", price: "price", kind: "applicableTo" },
    prepare: (v) => ({
      title: v.title,
      subtitle: `${v.price ?? "Quote"} · ${(v.kind || []).join(", ")}`,
    }),
  },
});
