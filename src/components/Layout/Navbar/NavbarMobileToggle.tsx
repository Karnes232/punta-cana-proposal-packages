interface NavbarMobileToggleProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function NavbarMobileToggle({
  isOpen,
  onToggle,
}: NavbarMobileToggleProps) {
  return (
    <button
      onClick={onToggle}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
      className="lg:hidden flex flex-col justify-center gap-[5px] p-1 ml-auto"
    >
      <span
        className={`block w-6 h-px bg-gold transition-all duration-300 origin-center ${
          isOpen ? "rotate-45 translate-y-[7px]" : ""
        }`}
      />
      <span
        className={`block w-6 h-px bg-gold transition-all duration-300 ${
          isOpen ? "opacity-0" : ""
        }`}
      />
      <span
        className={`block w-6 h-px bg-gold transition-all duration-300 origin-center ${
          isOpen ? "-rotate-45 -translate-y-[7px]" : ""
        }`}
      />
    </button>
  );
}
