import Image from "next/image";
import React from "react";
import { Link } from "@/i18n/navigation";
const MoreBlogsCard = ({
  blog,
  readMoreLabel,
  locale,
}: {
  blog: any;
  readMoreLabel: string;
  locale: "en" | "es";
}) => {
  const readTimeSuffix = locale === "es" ? "min de lectura" : "min read";
  return (
    <article className="group flex flex-col bg-white border border-gold/20 hover:border-gold/50 transition-colors duration-300 overflow-hidden h-full">
      {/* Photo */}
      <div className="relative aspect-[4/3] bg-black overflow-hidden shrink-0">
        <Image
          src={blog.heroPhoto.asset.url}
          alt={blog.heroPhoto.alt ?? `${blog.title} blog photo`}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          sizes="(max-width: 640px) 85vw, (max-width: 1024px) 45vw, 30vw"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"
          aria-hidden="true"
        />
        {/* Location */}
        <div className="absolute bottom-3 left-4 flex items-center gap-1.5">
          <span
            className="block w-1 h-1 rounded-full bg-gold shrink-0"
            aria-hidden="true"
          />
          <span className="text-[10.5px] font-body font-light tracking-[0.06em] text-white/70">
            {blog.readingTime}
            {readTimeSuffix}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 px-6 py-6 gap-3">
        <span className="text-[10px] font-body font-medium tracking-[0.16em] uppercase text-gold">
          {blog.categoryTag}
        </span>
        <h3 className="font-display font-normal text-fluid-h5 text-black leading-tight">
          {blog.title}
        </h3>
        <p className="font-body font-light italic text-fluid-sm text-gray leading-relaxed flex-1 line-clamp-3">
          "{blog.excerpt}"
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 mt-auto border-t border-gold/20">
          <span className="text-[10.5px] font-body font-light tracking-[0.04em] text-gray">
            {blog.publishedAt}
          </span>
          <Link
            href={`/blog/${blog.slug}`}
            className="inline-flex items-center gap-2 text-[10.5px] font-body font-medium tracking-[0.14em] uppercase text-black transition-colors duration-300 hover:text-gold group/link"
          >
            {readMoreLabel}
            <svg
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-300 group-hover/link:translate-x-1"
              aria-hidden="true"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default MoreBlogsCard;
