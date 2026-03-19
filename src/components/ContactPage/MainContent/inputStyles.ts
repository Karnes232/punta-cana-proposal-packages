// Shared Tailwind class strings for all form controls.
// Import wherever a consistent input/select/textarea style is needed.

export const inputClass = [
  "w-full h-[48px] px-4",
  "bg-white border border-gold/30",
  "font-body font-light text-[14px] text-black",
  "placeholder:text-black/25",
  "transition-colors duration-200",
  "hover:border-gold/60",
  "focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30",
].join(" ");

export const selectClass = [
  inputClass,
  // Native select needs appearance-none + custom chevron via bg-image
  "appearance-none cursor-pointer",
  // Chevron arrow via inline SVG background
  "bg-no-repeat bg-[right_14px_center]",
].join(" ");

export const textareaClass = [
  "w-full px-4 py-3",
  "bg-white border border-gold/30",
  "font-body font-light text-[14px] text-black",
  "placeholder:text-black/25",
  "transition-colors duration-200",
  "hover:border-gold/60",
  "focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30",
  "resize-none",
].join(" ");
