// Server Component
// Headings for PortableText content — Playfair Display, black text.
// Used inside BlockContent on the ivory legal pages. The id is the anchor
// the page's section list links to; scroll-mt keeps it below the navbar.

import React from "react";

const sizeMap: Record<string, string> = {
  h1: "text-[clamp(1.6rem,2.4vw,2rem)]",
  h2: "text-[clamp(1.4rem,2vw,1.75rem)]",
  h3: "text-[clamp(1.2rem,1.6vw,1.4rem)]",
  h4: "text-[clamp(1.1rem,1.4vw,1.2rem)]",
  h5: "text-[1.05rem]",
  h6: "text-[1rem]",
};

const TextComponentHeading = ({
  heading,
  headingNumber,
  id,
  HeadingClassName = "",
}: {
  heading: React.ReactNode;
  headingNumber: string;
  id?: string;
  HeadingClassName?: string;
}) => {
  const sizeClass = sizeMap[headingNumber] ?? sizeMap.h2;

  const sharedClass = `
    scroll-mt-28 font-display font-normal text-black
    leading-[1.25] text-balance
    ${sizeClass} ${HeadingClassName}
  `;

  switch (headingNumber) {
    case "h1":
      return (
        <h1 id={id} className={sharedClass}>
          {heading}
        </h1>
      );
    case "h3":
      return (
        <h3 id={id} className={sharedClass}>
          {heading}
        </h3>
      );
    case "h4":
      return (
        <h4 id={id} className={sharedClass}>
          {heading}
        </h4>
      );
    case "h5":
      return (
        <h5 id={id} className={sharedClass}>
          {heading}
        </h5>
      );
    case "h6":
      return (
        <h6 id={id} className={sharedClass}>
          {heading}
        </h6>
      );
    default:
      return (
        <h2 id={id} className={sharedClass}>
          {heading}
        </h2>
      );
  }
};

export default TextComponentHeading;
