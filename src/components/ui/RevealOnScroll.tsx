// Client Component
// Wraps any content in a fade-up reveal animation triggered by IntersectionObserver.
// The observer fires once (disconnects on first intersection) so the element stays
// visible after it enters the viewport — it won't re-animate on scroll back up.
// Use the `delay` prop to stagger multiple siblings.

"use client";

import { useRef, useEffect, useState } from "react";

interface RevealOnScrollProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // ms
  threshold?: number; // 0–1
}

export default function RevealOnScroll({
  children,
  className = "",
  delay = 0,
  threshold = 0.15,
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
