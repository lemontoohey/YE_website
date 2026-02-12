"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const placeholderImages = [
  {
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
    alt: "Portrait – professional headshot",
    width: 800,
    height: 1000,
  },
  {
    src: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=800&auto=format&fit=crop",
    alt: "Architecture – urban building",
    width: 800,
    height: 534,
  },
  {
    src: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=800&auto=format&fit=crop",
    alt: "Portrait – editorial fashion",
    width: 800,
    height: 1200,
  },
  {
    src: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop",
    alt: "Architecture – office interior",
    width: 800,
    height: 600,
  },
  {
    src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=800&auto=format&fit=crop",
    alt: "Portrait – lifestyle shot",
    width: 800,
    height: 1067,
  },
  {
    src: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=800&auto=format&fit=crop",
    alt: "Architecture – modern structure",
    width: 800,
    height: 534,
  },
  {
    src: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=800&auto=format&fit=crop",
    alt: "Commercial – business portrait",
    width: 800,
    height: 600,
  },
  {
    src: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=800&auto=format&fit=crop",
    alt: "Architecture – workspace",
    width: 800,
    height: 600,
  },
];

export function MasonryGallery() {
  return (
    <section className="px-4 py-section sm:px-6 lg:px-8">
      <h2 className="mx-auto mb-12 max-w-7xl font-serif text-3xl font-medium text-slate-950 sm:text-4xl">
        Selected Works
      </h2>
      <div className="mx-auto max-w-7xl columns-1 gap-4 md:columns-2 lg:columns-3">
        {placeholderImages.map((image, index) => (
          <motion.div
            key={image.src}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "0px 0px -50px 0px" }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="group mb-4 break-inside-avoid"
          >
            <div className="relative overflow-hidden">
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="w-full transition-transform duration-300 ease-out group-hover:scale-105"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
