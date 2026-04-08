"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

/** Path without locale prefix, e.g. `/blog` or `/blog/my-post`. */
export type BlogNavAlternate = { language: string; path: string };

type BlogLanguageAlternatesContextValue = {
  alternates: BlogNavAlternate[] | null;
  registerAlternates: (value: BlogNavAlternate[] | null) => void;
};

const BlogLanguageAlternatesContext =
  createContext<BlogLanguageAlternatesContextValue | null>(null);

export function BlogLanguageAlternatesProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [alternates, setAlternates] = useState<BlogNavAlternate[] | null>(null);
  const registerAlternates = useCallback((value: BlogNavAlternate[] | null) => {
    setAlternates(value);
  }, []);

  const value = useMemo(
    () => ({ alternates, registerAlternates }),
    [alternates, registerAlternates],
  );

  return (
    <BlogLanguageAlternatesContext.Provider value={value}>
      {children}
    </BlogLanguageAlternatesContext.Provider>
  );
}

export function useBlogLanguageAlternates(): BlogLanguageAlternatesContextValue {
  const ctx = useContext(BlogLanguageAlternatesContext);
  if (!ctx) {
    throw new Error(
      "useBlogLanguageAlternates must be used within BlogLanguageAlternatesProvider",
    );
  }
  return ctx;
}
