// Server Component

interface FeaturedStoryMetaProps {
  coupleName?: string;
  location?: string;
  date?: string;
  packageUsed?: string;
  locale?: string;
}

export default function FeaturedStoryMeta({
  coupleName = "Sofia & Marco",
  location = "Punta Cana",
  date,
  packageUsed,
  locale,
}: FeaturedStoryMetaProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {/* Couple name */}
      <p className="font-display italic text-white text-[clamp(22px,2.5vw,32px)] leading-tight">
        {coupleName}
      </p>

      {/* Location · Date */}
      <p className="text-[11.5px] font-light tracking-[0.14em] uppercase text-gold/80">
        {location}
        {date && (
          <>
            <span className="mx-2 text-gold/40">·</span>
            {new Date(date).toLocaleDateString(locale, {
              month: "long",
              year: "numeric",
            })}
          </>
        )}
      </p>

      {/* Package used */}
      {packageUsed && (
        <div className="flex items-center gap-2 mt-1">
          <span className="w-3 h-px bg-gold/50" aria-hidden="true" />
          <p className="text-[11px] font-light tracking-[0.12em] text-white/40">
            {packageUsed}
          </p>
        </div>
      )}
    </div>
  );
}
