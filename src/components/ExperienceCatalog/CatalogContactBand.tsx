import Link from "next/link";
import { buttonClass } from "./styles";

/** The end of a catalog page: its contact heading and a contact button. */
export default function CatalogContactBand({
  heading,
  label,
  prefix,
}: {
  /** The page's own heading above the button; none when empty. */
  heading?: string;
  /** "Contact us" in the visitor's language. */
  label: string;
  prefix: string;
}) {
  return (
    <section className="border-t border-t-(--ec-border) py-[45px]">
      {heading && <h2>{heading}</h2>}
      <Link
        className={buttonClass({ secondary: true })}
        href={`${prefix}/contact`}
      >
        {label} →
      </Link>
    </section>
  );
}
