import { defineType } from "sanity";
import { named, field, validActive } from "./shared";
export default defineType({
  name: "dinnerOccasion",
  type: "document",
  fields: [...named, field("allowCustomMessage", "boolean")],
  validation: (r) => r.custom(validActive),
  preview: {
    select: { title: "name.en", active: "active" },
    prepare: (v) => ({
      title: v.title,
      subtitle: v.active ? "Active" : "Inactive",
    }),
  },
});
