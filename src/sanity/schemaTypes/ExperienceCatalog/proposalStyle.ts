import { defineType } from "sanity";
import { bi } from "../shared/labels";
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
      if (!v?.active) return true;
      if (!hasImage(v.mainImage))
        return bi("Añade la foto principal", "Add the main photo");
      if (!(v.mainImage as { alt?: { en?: string } }).alt?.en?.trim())
        return bi(
          "Describe la foto principal en inglés (texto alternativo)",
          "Describe the main photo in English (alt text)",
        );
      if (typeof v.price !== "number")
        return bi("Indica el precio del estilo", "Enter the style's price");
      return true;
    }),
  preview: {
    select: { title: "name.en", media: "mainImage", subtitle: "price" },
  },
});
