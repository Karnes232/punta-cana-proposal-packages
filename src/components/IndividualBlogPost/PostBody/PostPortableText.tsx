import {
    PortableText,
    type PortableTextReactComponents,
    type PortableTextBlock,
  } from "@portabletext/react";
  
  const components: Partial<PortableTextReactComponents> = {
    block: {
      normal: ({ children }) => (
        <p className="font-body font-light text-fluid-base text-black/80 leading-[1.85] mb-6">
          {children}
        </p>
      ),
      h2: ({ children }) => (
        <h2 className="font-display font-normal text-fluid-h4 text-black leading-tight mt-12 mb-4">
          {children}
        </h2>
      ),
      h3: ({ children }) => (
        <h3 className="font-display font-normal text-fluid-h5 text-black leading-tight mt-10 mb-3">
          {children}
        </h3>
      ),
      blockquote: ({ children }) => (
        <blockquote className="border-l-2 border-gold/30 pl-6 my-8">
          <p className="font-display font-normal italic text-fluid-base text-black/70 leading-relaxed">
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
        <em className="italic text-black/75">{children}</em>
      ),
      link: ({ value, children }) => (
        <a
          href={value?.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gold underline underline-offset-2 decoration-gold/40 hover:decoration-gold transition-colors duration-300"
        >
          {children}
        </a>
      ),
    },
    list: {
      bullet: ({ children }) => (
        <ul className="flex flex-col gap-2 my-6 pl-1">{children}</ul>
      ),
      number: ({ children }) => (
        <ol className="flex flex-col gap-2 my-6 pl-6 list-decimal marker:text-gold/60 marker:font-body marker:text-sm">
          {children}
        </ol>
      ),
    },
    listItem: {
      bullet: ({ children }) => (
        <li className="flex items-start gap-3 font-body font-light text-fluid-base text-black/80 leading-[1.85]">
          <span
            className="block w-1.5 h-1.5 rounded-full bg-gold/60 mt-[0.65em] shrink-0"
            aria-hidden="true"
          />
          <span>{children}</span>
        </li>
      ),
      number: ({ children }) => (
        <li className="font-body font-light text-fluid-base text-black/80 leading-[1.85]">
          {children}
        </li>
      ),
    },
  };
  
  interface PostPortableTextProps {
    body: PortableTextBlock[];
  }
  
  export default function PostPortableText({ body }: PostPortableTextProps) {
    return (
      <div className="max-w-prose">
        <PortableText value={body} components={components} />
      </div>
    );
  }