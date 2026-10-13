// Which question categories the FAQ filter shows.
// No path aliases: the tests compile this file on its own.

/**
 * The categories at least one question belongs to, in the Studio's order.
 * A category nobody has written a question for yet gets no filter button.
 */
export function categoriesInUse<Category extends { value: string }>(
  categories: Category[],
  faqs: { category?: { value: string } }[],
) {
  const used = new Set(faqs.map((faq) => faq.category?.value));
  return categories.filter((category) => used.has(category.value));
}
