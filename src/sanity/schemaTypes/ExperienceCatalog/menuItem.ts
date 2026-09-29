import { defineType, defineField } from "sanity";
import { named, field, options, image, money, validActive } from "./shared";
export default defineType({
  name: "menuItem",
  type: "document",
  fields: [
    ...named,
    options("courseType", ["starter", "main", "dessert"]),
    image("image"),
    field("included", "boolean"),
    money("supplementPrice"),
    defineField({
      name: "dietaryTags",
      type: "array",
      of: [{ type: "string" }],
    }),
    field("allergenInformation", "localizedText"),
    field("internalNotes", "text"),
  ],
  validation: (r) =>
    r.custom((v) => {
      const c = validActive(v);
      return c !== true
        ? c
        : v?.active &&
            (!v.courseType ||
              (!v.included && typeof v.supplementPrice !== "number"))
          ? "Configure course and supplement"
          : true;
    }),
  preview: {
    select: {
      title: "name.en",
      course: "courseType",
      price: "supplementPrice",
    },
    prepare: (v) => ({
      title: v.title,
      subtitle: `${v.course || ""} · ${v.price ?? 0}`,
    }),
  },
});
