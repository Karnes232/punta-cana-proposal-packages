import { defineType } from "sanity";
import { named, field, image, money, options, validActive } from "./shared";
export default defineType({
  name: "beverageOption",
  type: "document",
  fields: [
    ...named,
    options("type", ["wine", "welcomeDrink", "sparkling", "other"]),
    field("included", "boolean"),
    money("supplementPrice"),
    image("image"),
  ],
  validation: (r) =>
    r.custom((v) => {
      const c = validActive(v);
      return c !== true
        ? c
        : v?.active &&
            (!v.type || (!v.included && typeof v.supplementPrice !== "number"))
          ? "Configure type and supplement"
          : true;
    }),
  preview: { select: { title: "name.en", subtitle: "type" } },
});
