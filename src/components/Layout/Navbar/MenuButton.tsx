import type { Ref } from "react";
import { FiMenu, FiX } from "react-icons/fi";

/** The phone and tablet Menu button; the X icon while the menu is open. */
export default function MenuButton({
  ref,
  open,
  controls,
  label,
  onClick,
}: {
  ref: Ref<HTMLButtonElement>;
  open: boolean;
  /** The menu sheet's id. */
  controls: string;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      ref={ref}
      type="button"
      aria-expanded={open}
      aria-controls={controls}
      onClick={onClick}
      className="hidden min-h-11 cursor-pointer items-center gap-2 px-1 text-[13px] tracking-[0.12em] text-ivory uppercase transition-colors duration-200 upto1280:flex [&:hover]:text-gold"
    >
      {open ? (
        <FiX aria-hidden className="text-[20px]" />
      ) : (
        <FiMenu aria-hidden className="text-[20px]" />
      )}
      {label}
    </button>
  );
}
