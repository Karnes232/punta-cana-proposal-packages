import CardCarousel from "@/components/ui/CardCarousel";
import MoreSection from "@/components/ui/MoreSection";
import MoreBlogsCard from "./MoreBlogsCard";
import type { MoreBlogsPost } from "./types";

export default function MoreBlogs({
  blogs,
  locale,
}: {
  blogs: MoreBlogsPost[];
  locale: string;
}) {
  if (!blogs || blogs.length === 0) return null;

  const es = locale === "es";

  return (
    <MoreSection
      label={es ? "Más Publicaciones" : "More Blogs"}
      heading={es ? "Más Publicaciones" : "More Blogs"}
      headingAccent={es ? "Publicaciones Relacionadas" : "Related Blogs"}
    >
      <CardCarousel
        prevLabel={es ? "Anterior" : "Previous"}
        nextLabel={es ? "Siguiente" : "Next"}
      >
        {blogs.map((blog) => (
          <MoreBlogsCard
            key={blog.slug}
            blog={blog}
            readMoreLabel={es ? "Leer Historia" : "Read Story"}
            locale={locale}
          />
        ))}
      </CardCarousel>
    </MoreSection>
  );
}
