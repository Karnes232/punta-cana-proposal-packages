// Server Component
// Bullet and numbered lists for PortableText content.
// Uses a small gold square instead of default browser bullets.

import React from "react";

interface TextComponentListProps {
  items: React.ReactNode;
  listType: "bullet" | "number";
  ListClassName?: string;
}

const TextComponentList: React.FC<TextComponentListProps> = ({
  items,
  listType,
  ListClassName = "",
}) => {
  const itemClass = `
    font-body text-[#3f3f44] text-pretty
    text-[16px] lg:text-[17px] leading-[1.75]
    pl-1
  `;

  if (listType === "bullet") {
    return (
      <ul className={`space-y-2 ${ListClassName}`}>
        {React.Children.map(items, (item, i) => (
          <li key={i} className={`flex items-start gap-3 ${itemClass}`}>
            <span
              className="mt-[0.7em] h-[5px] w-[5px] shrink-0 bg-gold"
              aria-hidden="true"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ol className={`space-y-2 ${ListClassName}`}>
      {React.Children.map(items, (item, i) => (
        <li key={i} className={`flex items-start gap-4 ${itemClass}`}>
          <span className="w-5 shrink-0 text-right text-[#9b773d] tabular-nums">
            {i + 1}.
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ol>
  );
};

export default TextComponentList;
