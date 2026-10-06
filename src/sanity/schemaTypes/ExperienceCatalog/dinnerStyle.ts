import { defineType } from "sanity";
import { bi } from "../shared/labels";
import { named, image, objects, validActive, hasImage } from "./shared";
export default defineType({
  name: "dinnerStyle",
  type: "object",
  fields: [...named, image("mainImage"), objects("gallery", "experiencePhoto")],
  validation: (r) =>
    r.custom((v) => {
      const check = validActive(v);
      if (check !== true) return check;
      if (!v?.active) return true;
      if (!hasImage(v.mainImage))
        return bi("Añade la foto principal", "Add the main photo");
      return true;
    }),
  preview: { select: { title: "name.en", media: "mainImage" } },
});
