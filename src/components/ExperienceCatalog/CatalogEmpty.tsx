import Link from "next/link";

/** No packages or dinners published yet: a note and a contact link. */
export default function CatalogEmpty({
  message,
  contactLabel,
  prefix,
}: {
  message: string;
  contactLabel: string;
  prefix: string;
}) {
  return (
    <div className="rounded-[4px] border border-(--ec-border) p-[38px]">
      <p>{message}</p>
      <Link href={prefix + "/contact"}>{contactLabel} →</Link>
    </div>
  );
}
