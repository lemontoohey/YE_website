"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { SITE_CONTENT } from "@/lib/data";

const CATEGORIES = [
  "All",
  ...Array.from(
    new Set(SITE_CONTENT.gallery.map((img) => img.category))
  ) as string[],
];

export function MasonryGallery() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredImages = useMemo(
    () =>
      activeCategory === "All"
        ? SITE_CONTENT.gallery
        : SITE_CONTENT.gallery.filter((img) => img.category === activeCategory),
    [activeCategory]
  );

  return (
    <section id="work" className="px-4 py-section sm:px-6 lg:px-8">
      <h2 className="mx-auto mb-12 max-w-7xl font-heading text-3xl font-medium text-parchment-100 sm:text-4xl">
        Selected Works
      </h2>

      {/* Filter buttons */}
      <div className="mx-auto mb-10 max-w-7xl">
        <div className="flex flex-wrap gap-6">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`text-sm font-medium transition-colors hover:text-parchment-100/80 ${
                activeCategory === category ? "text-parchment-100" : "text-parchment-100/50"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery */}
      <div className="mx-auto max-w-7xl columns-1 gap-4 md:columns-2 lg:columns-3">
        <AnimatePresence mode="popLayout">
          {filteredImages.map((image) => (
            <motion.div
              key={image.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              viewport={{ once: true, margin: "0px 0px -50px 0px" }}
              className="group mb-4 break-inside-avoid"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
