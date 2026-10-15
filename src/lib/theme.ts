/**
 * Light and dark themes. The theme is data-theme on <html>: the visitor's
 * own choice (saved in localStorage), else their device's setting.
 */
export type Theme = "light" | "dark";

/** Where the visitor's choice is saved. */
export const THEME_STORAGE_KEY = "theme";

/**
 * Runs in <head> before the page is painted, so a dark visitor never sees
 * the light page flash first. A static string, no visitor input.
 */
export const THEME_SCRIPT = `
(function () {
  try {
    var theme = localStorage.getItem("${THEME_STORAGE_KEY}");
    if (theme !== "light" && theme !== "dark") {
      theme = matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    document.documentElement.dataset.theme = theme;
  } catch (error) {
    document.documentElement.dataset.theme = "light";
  }
})();
`;

/** The theme on the page now. */
export function currentTheme(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

/** The visitor's saved choice, if they made one. */
export function savedTheme(): Theme | null {
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    return saved === "light" || saved === "dark" ? saved : null;
  } catch {
    return null;
  }
}

/** Shows a theme and, when the visitor picked it, remembers it. */
export function applyTheme(theme: Theme, remember: boolean) {
  document.documentElement.dataset.theme = theme;
  if (!remember) return;
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Private windows can refuse storage; the theme still applies now.
  }
}
