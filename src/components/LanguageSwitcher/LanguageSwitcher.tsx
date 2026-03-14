"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation"; // adjust to your alias
import { useTransition } from "react";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const isEN = locale === "en";

  function switchLocale(next: "en" | "es") {
    if (next === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  }

  return (
    <div
      className="h-[34px] relative flex items-center gap-0 rounded-sm overflow-hidden"
      style={{
        border: "1px solid #CFAE70",
        opacity: isPending ? 0.6 : 1,
        transition: "opacity 300ms ease",
      }}
      aria-label="Language switcher"
    >
      {/* Sliding indicator */}
      <span
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: isEN ? 0 : "50%",
          width: "50%",
          background: "#CFAE70",
          transition: "left 350ms cubic-bezier(0.4, 0, 0.2, 1)",
          zIndex: 0,
        }}
      />

      <LangButton label="EN" active={isEN} onClick={() => switchLocale("en")} />
      <LangButton
        label="ES"
        active={!isEN}
        onClick={() => switchLocale("es")}
      />
    </div>
  );
}

function LangButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={active}
      aria-pressed={active}
      aria-label={`Switch to ${label}`}
      style={{
        position: "relative",
        zIndex: 1,
        minWidth: 44, // 44px touch target
        height: "38.5px",
        padding: "0 14px",
        fontFamily: "'Inter', sans-serif",
        fontSize: "0.7rem",
        fontWeight: 600,
        letterSpacing: "0.1em",
        color: active ? "#0B0B0C" : "#CFAE70",
        background: "transparent",
        border: "none",
        cursor: active ? "default" : "pointer",
        transition: "color 350ms cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      {label}
    </button>
  );
}
