// Server Component
// Bullet and numbered lists for PortableText content.
// Uses a gold ornament instead of default browser bullets.

import React from "react";

interface TextComponentListProps {
  items: React.ReactNode[];
  listType: "bullet" | "number";
  ListClassName?: string;
}

const TextComponentList: React.FC<TextComponentListProps> = ({
  items,
  listType,
  ListClassName = "",
}) => {
  const itemClass = `
    font-body font-light text-gray
    text-[clamp(14px,1.4vw,16px)] leading-[1.9]
    pl-2
  `;

  if (listType === "bullet") {
    return (
      <ul className={`space-y-3 ${ListClassName}`}>
        {React.Children.map(items, (item, i) => (
          <li key={i} className={`flex items-start gap-3 ${itemClass}`}>
            {/* Gold diamond bullet */}
            <span
              className="mt-[0.6em] shrink-0 w-1 h-1 rotate-45 bg-gold"
              aria-hidden="true"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ol className={`space-y-3 ${ListClassName}`}>
      {React.Children.map(items, (item, i) => (
        <li key={i} className={`flex items-start gap-4 ${itemClass}`}>
          {/* Number in Playfair italic */}
          <span className="shrink-0 font-display italic text-black/30 text-[15px] leading-[1.9] w-5 text-right">
            {i + 1}.
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ol>
  );
};

export default TextComponentList;
