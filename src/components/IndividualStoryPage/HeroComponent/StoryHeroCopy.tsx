interface StoryHeroCopyProps {
  names: string;
  packageTag: string;
  date: string;
  location: string;
  locale: "en" | "es";
}

export default function StoryHeroCopy({
  names,
  packageTag,
  date,
  location,
  locale,
}: StoryHeroCopyProps) {
  const dateStr = new Date(date).toLocaleDateString(locale, {
    month: "long",
    year: "numeric",
  });
  const capitalizedDate = dateStr.charAt(0).toUpperCase() + dateStr.slice(1);

  return (
    <div className="flex flex-col gap-4">
      {/* Package tag */}
      <span className="text-[10.5px] font-body font-medium tracking-[0.2em] uppercase text-gold/90">
        {packageTag}
      </span>

      {/* Couple names */}
      <h1
        className="
            font-display font-normal text-white leading-[1.08] tracking-tight
            text-[clamp(40px,5.5vw,80px)]
            animate-[fadeSlideUp_0.7s_ease_forwards] opacity-0 [animation-delay:200ms]
          "
      >
        {names}
      </h1>

      {/* Gold divider */}
      <div className="flex items-center gap-3" aria-hidden="true">
        <span className="block w-10 h-px bg-gold/50" />
        <span className="block w-1 h-1 rotate-45 bg-gold/70" />
        <span className="block w-10 h-px bg-gold/50" />
      </div>

      {/* Date · Location */}
      <p className="flex items-center gap-2 text-[11.5px] font-body font-light tracking-[0.1em] text-white/60">
        <span>{capitalizedDate}</span>
        <span className="text-gold/50" aria-hidden="true">
          ·
        </span>
        <span>{location}</span>
      </p>
    </div>
  );
}
