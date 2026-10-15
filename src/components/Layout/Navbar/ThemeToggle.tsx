"use client";

import { useEffect, useSyncExternalStore } from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import { applyTheme, currentTheme, savedTheme, type Theme } from "@/lib/theme";

const darkQuery = "(prefers-color-scheme: dark)";

/** Re-renders when data-theme on <html> changes (from any toggle). */
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

/**
 * Switches between the light and dark themes. Until the visitor picks one,
 * the site follows their device's setting, also when it changes.
 *
 * - `icon`: the round button in the desktop bar.
 * - `row`: the labelled button in the phone menu.
 */
export default function ThemeToggle({
  label,
  variant,
}: {
  /** "Dark mode" in the visitor's language. */
  label: string;
  variant: "icon" | "row";
}) {
  // The server can't know the theme: it renders light, then the real
  // theme shows right after hydration.
  const theme = useSyncExternalStore<Theme>(
    subscribe,
    currentTheme,
    () => "light",
  );
  const dark = theme === "dark";

  useEffect(() => {
    const media = matchMedia(darkQuery);
    const follow = () => {
      if (!savedTheme()) applyTheme(media.matches ? "dark" : "light", false);
    };
    media.addEventListener("change", follow);
    return () => media.removeEventListener("change", follow);
  }, []);

  const Icon = dark ? FiSun : FiMoon;
  const toggle = () => applyTheme(dark ? "light" : "dark", true);

  if (variant === "icon")
    return (
      <button
        type="button"
        aria-label={label}
        aria-pressed={dark}
        onClick={toggle}
        className="grid size-11 cursor-pointer place-items-center text-ivory/80 transition-colors duration-200 motion-reduce:transition-none [&:hover]:text-gold"
      >
        <Icon aria-hidden="true" className="size-[18px]" />
      </button>
    );

  return (
    <button
      type="button"
      aria-pressed={dark}
      onClick={toggle}
      className="flex min-h-12 w-full cursor-pointer items-center justify-between gap-3 text-[15px] text-ivory transition-colors duration-200 motion-reduce:transition-none [&:hover]:text-gold"
    >
      {label}
      <Icon aria-hidden="true" className="size-5 text-gold" />
    </button>
  );
}
