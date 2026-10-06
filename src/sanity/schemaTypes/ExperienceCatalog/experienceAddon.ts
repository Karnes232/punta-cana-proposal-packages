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
  // Settings that would make the extra impossible to select or price.
  validation: (r) =>
    r.custom((v) => {
      const check = validActive(v);
      if (check !== true) return check;
      const problem = (path: string, es: string, en: string) => ({
        message: bi(es, en),
        paths: [[path]],
      });
      const kinds = Array.isArray(v?.applicableTo) ? v.applicableTo : [];
      const counted = ["perUnit", "perHour", "per30Minutes"].includes(
        String(v?.pricingType),
      );
      if (v?.maximumQuantity !== undefined && Number(v.maximumQuantity) < 1)
        return problem(
          "maximumQuantity",
          "Al menos 1 (o déjalo vacío)",
          "At least 1 (or leave it empty)",
        );
      if (Number(v?.maximumQuantity) < Number(v?.minimumQuantity))
        return problem(
          "maximumQuantity",
          "El máximo no puede ser menor que el mínimo",
          "The maximum can't be below the minimum",
        );
      if (!counted && Number(v?.minimumQuantity) > 1)
        return problem(
          "minimumQuantity",
          "Solo los extras por unidad u hora llevan cantidad mínima",
          "Only per-unit or per-hour extras take a minimum quantity",
        );
      if (
        v?.durationMinutesPerUnit !== undefined &&
        (kinds.length !== 1 || kinds[0] !== "romanticDinner")
      )
        return problem(
          "durationMinutesPerUnit",
          "La duración solo aplica a extras de cenas",
          "Duration only applies to dinner extras",
        );
      if (v?.active && !v.pricingType)
        return problem(
          "pricingType",
          "Elige cómo se cobra",
          "Choose how it's priced",
        );
      if (v?.active && !kinds.length)
        return problem(
          "applicableTo",
          "Elige dónde se ofrece",
          "Choose where it's offered",
        );
      if (
        v?.active &&
        v.pricingType !== "quoteOnly" &&
        typeof v.price !== "number"
      )
        return problem("price", "Indica el precio", "Enter the price");
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
