import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/react";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="font-body font-light text-fluid-base text-black/75 leading-[1.9] mb-6 last:mb-0">
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2 className="font-display font-normal text-fluid-h3 text-black mt-12 mb-4 leading-snug">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-display font-normal text-fluid-h4 text-black mt-10 mb-3 leading-snug">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l border-gold/40 pl-5 my-8">
        <p className="font-display italic text-fluid-lg text-black/70 leading-relaxed">
          {children}
        </p>
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-medium text-black">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic font-display">{children}</em>
    ),
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target={value?.blank ? "_blank" : undefined}
        rel={value?.blank ? "noopener noreferrer" : undefined}
        className="text-black underline underline-offset-2 decoration-gold/50 hover:decoration-gold transition-all duration-300"
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="space-y-2 mb-6 pl-4">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="space-y-2 mb-6 pl-4 list-decimal">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="font-body font-light text-fluid-base text-black/75 leading-relaxed flex gap-3">
        <span className="mt-2.5 block w-1 h-1 rounded-full bg-gold shrink-0" aria-hidden="true" />
        <span>{children}</span>
      </li>
    ),
    number: ({ children }) => (
      <li className="font-body font-light text-fluid-base text-black/75 leading-relaxed">
        {children}
      </li>
    ),
  },
};

interface StoryPortableTextProps {
  body: PortableTextBlock[];
}

export default function StoryPortableText({ body }: StoryPortableTextProps) {
  return (
    <div className="prose-story">
      <PortableText value={body} components={components} />
    </div>
  );
}