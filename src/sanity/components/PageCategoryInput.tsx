"use client";

import { Select } from "@sanity/ui";
import { set, unset, useFormValue, type StringInputProps } from "sanity";

type Category = { _key: string; name?: string };

/**
 * Picks one of the categories listed in the same document's FAQ section
 * (faq.categories). Stores the category's _key.
 */
export function PageCategoryInput(props: StringInputProps) {
  const categories =
    (useFormValue(["faq", "categories"]) as Category[] | undefined) ?? [];
  return (
    <Select
      value={props.value ?? ""}
      onChange={(event) =>
        props.onChange(
          event.currentTarget.value ? set(event.currentTarget.value) : unset(),
        )
      }
    >
      <option value="">—</option>
      {categories.map((category) => (
        <option key={category._key} value={category._key}>
          {category.name || category._key}
        </option>
      ))}
    </Select>
  );
}
