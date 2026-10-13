/**
 * The tall/normal rhythm shared by the stories and blog grids. Cards come in
 * blocks of five on desktop (three columns): one tall card spanning two rows
 * plus four normal ones. Even blocks put the tall card in column 1, odd
 * blocks in column 3:
 *
 *   [tall] [ 2 ] [ 3 ]      [ 1 ] [ 2 ] [tall]
 *   [tall] [ 4 ] [ 5 ]      [ 4 ] [ 5 ] [tall]
 *
 * A block with fewer than five cards has no tall card, so it leaves no holes.
 * Tablets and phones get a plain even grid.
 */

const BLOCK_SIZE = 5;

/** Two full blocks, so a page never ends on a half-filled block. */
export const ASYMMETRIC_PAGE_SIZE = BLOCK_SIZE * 2;

export const asymmetricGridClass =
  "grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3";

/**
 * The grid classes for the card at `index` of `count` shown cards, or null
 * when it is a normal card.
 */
export function tallPlacement(index: number, count: number): string | null {
  const block = Math.floor(index / BLOCK_SIZE);
  const isComplete = (block + 1) * BLOCK_SIZE <= count;
  if (!isComplete) return null;
  const position = index % BLOCK_SIZE;
  if (block % 2 === 0) {
    return position === 0 ? "lg:row-span-2" : null;
  }
  return position === 2 ? "lg:col-start-3 lg:row-span-2" : null;
}

/** Photo classes for a tall card: it grows to fill both rows on desktop. */
export const tallPhotoClass = "lg:aspect-auto lg:min-h-[320px] lg:flex-1";
