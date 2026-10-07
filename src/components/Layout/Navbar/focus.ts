import type { KeyboardEvent } from "react";

/**
 * Tab and Shift+Tab loop inside the container. Used while the phone menu
 * covers the page, so focus never lands on what's hidden behind it.
 */
export function keepFocusInside(
  event: KeyboardEvent<HTMLElement>,
  container: HTMLElement,
) {
  if (event.key !== "Tab") return;
  const focusable = [
    ...container.querySelectorAll<HTMLElement>("a[href], button"),
  ].filter((element) => element.getClientRects().length > 0);
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last?.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first?.focus();
  }
}
