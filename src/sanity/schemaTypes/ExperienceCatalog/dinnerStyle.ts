import { defineType } from "sanity";
import { named, image, objects, validActive, hasImage } from "./shared";
export default defineType({
  name: "dinnerStyle",
  type: "object",
  fields: [...named, image("mainImage"), objects("gallery", "experiencePhoto")],
  validation: (r) =>
    r.custom((v) => {
      const check = validActive(v);
      return check !== true
        ? check
        : v?.active && !hasImage(v.mainImage)
          ? "Active styles require an image"
          : true;
    }),
  preview: { select: { title: "name.en", media: "mainImage" } },
});
