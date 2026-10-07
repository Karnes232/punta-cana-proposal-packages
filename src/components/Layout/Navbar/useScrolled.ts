import { useEffect, useRef, useState } from "react";

/**
 * Scrolled once a marker at the top of the page (24px tall, rendered by the
 * caller with the returned ref) leaves the screen. No scroll listener.
 */
export function useScrolled() {
  const sentinel = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const marker = sentinel.current;
    if (!marker) return;
    const observer = new IntersectionObserver(([entry]) =>
      setScrolled(!entry.isIntersecting),
    );
    observer.observe(marker);
    return () => observer.disconnect();
  }, []);

  return [sentinel, scrolled] as const;
}
