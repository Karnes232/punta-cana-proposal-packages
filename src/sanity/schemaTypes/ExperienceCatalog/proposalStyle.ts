import { defineType } from "sanity";
import { named, image, money, field, validActive, hasImage } from "./shared";
export default defineType({
  name: "proposalStyle",
  type: "object",
  fields: [
    ...named,
    image("mainImage"),
    money("price"),
    field("internalNotes", "text"),
  ],
  validation: (r) =>
    r.custom((v) => {
      const result = validActive(v);
      if (result !== true) return result;
      if (v?.active && (!hasImage(v.mainImage) || typeof v.price !== "number"))
        return "Active styles require an image and complete variant price";
      return true;
    }),
  preview: {
    select: { title: "name.en", media: "mainImage", subtitle: "price" },
  },
});
