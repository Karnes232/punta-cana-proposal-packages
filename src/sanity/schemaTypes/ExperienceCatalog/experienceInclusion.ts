import { defineType } from "sanity";
import { named, field, validActive } from "./shared";
export default defineType({
  name: "experienceInclusion",
  type: "object",
  fields: [...named, field("icon")],
  validation: (r) => r.custom(validActive),
  preview: { select: { title: "name.en" } },
});
