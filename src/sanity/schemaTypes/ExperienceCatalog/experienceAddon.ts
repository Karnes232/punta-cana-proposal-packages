import { defineType, defineField } from "sanity";
import { replacedByProposalExtra } from "@/lib/experience/proposalExtras";
import { bi } from "../shared/labels";
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
  description: bi(
    "Las propuestas siempre ofrecen cuatro extras fijos (videógrafo con drone, violinista, saxofonista y cena para dos); un extra parecido de aquí no se muestra en las propuestas",
    "Proposals always offer four fixed extras (drone videographer, violinist, saxophonist and dinner for two); a look-alike add-on here isn't shown on proposals",
  ),
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
    select: {
      _id: "_id",
      title: "name.en",
      es: "name.es",
      price: "price",
      kind: "applicableTo",
    },
    prepare: (v) => ({
      title: v.title,
      subtitle:
        (v.kind || []).includes("proposal") &&
        replacedByProposalExtra({ _id: v._id, name: { en: v.title, es: v.es } })
          ? bi(
              "No se muestra · lo reemplaza el extra fijo",
              "Not shown · replaced by the fixed extra",
            )
          : `${v.price ?? "Quote"} · ${(v.kind || []).join(", ")}`,
    }),
  },
});
