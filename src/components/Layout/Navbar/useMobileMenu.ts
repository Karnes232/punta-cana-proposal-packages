import { useEffect, useState } from "react";
import { DESKTOP } from "./navigation";

/**
 * The phone menu's open state. It remembers the page it was opened on, so
 * moving to another page closes it. While it covers the page: no page
 * scroll, and it closes if the window grows into the desktop layout.
 */
export function useMobileMenu(pathname: string) {
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const desktop = window.matchMedia(DESKTOP);
    const closeOnDesktop = () => {
      if (desktop.matches) setOpenOn(null);
    };
    root.style.overflow = "hidden";
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      root.style.overflow = "";
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [open]);

  return {
    open,
    toggle: () => setOpenOn(open ? null : pathname),
    close: () => setOpenOn(null),
  };
}
