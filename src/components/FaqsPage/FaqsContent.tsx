"use client";
import React, { useState } from "react";
import FaqAccordion from "@/components/FaqsPage/FaqAccordion/FaqAccordion";
import FaqCategoryFilter from "@/components/FaqsPage/FaqCategoryFilter/FaqCategoryFilter";
const FaqsContent = ({ locale }: any) => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  return (
    <>
      <FaqCategoryFilter
        locale={locale as "en" | "es"}
        onCategoryChange={setActiveCategory}
      />
      <FaqAccordion
        activeCategory={activeCategory}
        locale={locale as "en" | "es"}
      />
    </>
  );
};

export default FaqsContent;
