import Image from "next/image";

/** The first column: logo and name (linking home), then the description. */
export default function FooterBrand({
  href,
  name,
  homeLabel,
  logo,
  description,
}: {
  href: string;
  name: string;
  /** "Home" in the visitor's language, for screen readers. */
  homeLabel: string;
  logo?: string;
  description?: string;
}) {
  return (
    <div className="sm:col-span-2 lg:col-span-1">
      <a
        href={href}
        className="inline-flex items-center gap-4"
        aria-label={`${name}, ${homeLabel}`}
      >
        {logo && (
          <Image
            src={logo}
            alt=""
            width={64}
            height={64}
            className="h-16 w-16 object-contain"
          />
        )}
        <span className="font-display text-xl leading-tight">{name}</span>
      </a>
      {description && (
        <p className="mt-5 max-w-[34ch] text-sm leading-relaxed text-ivory/70">
          {description}
        </p>
      )}
    </div>
  );
}
