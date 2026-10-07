/* eslint-disable @next/next/no-img-element */

const DEFAULT_NAME = "Punta Cana Proposal Packages";

/** The logo, linking home; the company name when there is no logo. */
export default function NavbarLogo({
  href,
  logo,
  companyName,
  homeLabel,
}: {
  href: string;
  logo?: string;
  companyName?: string;
  /** "Home" in the visitor's language, for screen readers. */
  homeLabel: string;
}) {
  const name = companyName || DEFAULT_NAME;
  return (
    <a href={href} aria-label={`${name} — ${homeLabel}`}>
      {logo ? (
        <img
          src={logo}
          alt={name}
          width={72}
          height={72}
          className="h-[72px] w-[72px] object-contain upto700:h-[60px] upto700:w-[60px]"
        />
      ) : (
        <span>{name}</span>
      )}
    </a>
  );
}
