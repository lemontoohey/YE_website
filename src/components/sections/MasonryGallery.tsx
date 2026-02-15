"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { LuxeImage } from "@/components/ui";

type EvidenceItem = {
  id: number;
  title: string;
  src: string;
  price: string | null;
  description: string;
  stripe_price_id?: string | null;
};

import evidenceLockerRaw from "@/lib/evidence_locker.json";
const evidenceData = Array.isArray(evidenceLockerRaw) ? (evidenceLockerRaw as EvidenceItem[]) : [];

const CATEGORIES = ["All", "Prints", "Apparel", "Merch", "Posters"];

export function MasonryGallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const filteredItems = useMemo(
    () =>
      activeCategory === "All"
        ? evidenceData
        : evidenceData.filter((item) => {
            const t = item.title.toLowerCase();
            if (activeCategory === "Prints") return t.includes("poster") || t.includes("print");
            if (activeCategory === "Apparel") return t.includes("shirt") || t.includes("tee") || t.includes("t-shirt");
            if (activeCategory === "Merch") return t.includes("tray") || t.includes("rug") || t.includes("towel") || t.includes("apron");
            if (activeCategory === "Posters") return t.includes("poster");
            return true;
          }),
    [activeCategory]
  );

  const handleInquire = (e: React.MouseEvent, item: EvidenceItem) => {
    e.preventDefault();
    e.stopPropagation();
    const msg = `I am interested in acquiring the following asset: ${item.title}`;
    if (typeof window !== "undefined") {
      sessionStorage.setItem("inquiryMessage", msg);
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (evidenceData.length === 0) {
    return (
      <section id="work" className="px-4 py-section sm:px-6 lg:px-8">
        <h2 className="mx-auto mb-12 max-w-7xl font-warning text-3xl text-parchment-100 sm:text-4xl">
          EVIDENCE LOCKER
        </h2>
        <p className="text-center text-parchment-100/60">
          Run <code className="font-mono">npm run heist</code> to populate the gallery.
        </p>
      </section>
    );
  }

  return (
    <section id="work" className="bg-void-950 px-4 py-section sm:px-6 lg:px-8">
      <h2 className="mx-auto mb-12 max-w-7xl font-warning text-3xl text-parchment-100 sm:text-4xl">
        EVIDENCE LOCKER
      </h2>

      <div className="mx-auto mb-10 max-w-7xl">
        <div className="flex flex-wrap items-end justify-center gap-0 border-b border-white/20">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 font-mono text-sm transition-all ${
                activeCategory === cat
                  ? "-mb-px rounded-t-md border-b-2 border-accent-500 bg-white text-black font-bold shadow-lg"
                  : "text-white/50 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl columns-1 gap-8 md:columns-2 lg:columns-3">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item) => (
            <EvidenceCard
              key={item.id}
              item={item}
              onInquire={(e) => handleInquire(e, item)}
            />
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}

function EvidenceCard({
  item,
  onInquire,
}: {
  item: EvidenceItem;
  onInquire: (e: React.MouseEvent) => void;
}) {
  return (
    <Link href={`/locker/${item.id}`}>
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="group relative mb-8 break-inside-avoid"
    >
      <div className="relative bg-white p-2 shadow-lg">
        <div className="relative aspect-[4/5] w-full overflow-hidden">
          <div className="relative h-full w-full transition-transform duration-500 group-hover:scale-[1.02]">
            <LuxeImage
              src={item.src}
              alt={item.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover grayscale contrast-[1.1] brightness-90 transition-all duration-500 group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-100"
            />
          </div>
          {/* Holo-Case sheen - 5% accent tint (sunset reflection) */}
          <div
            className="pointer-events-none absolute inset-0 z-10 opacity-50"
            style={{
              background: "linear-gradient(to top right, rgba(255, 90, 95, 0.05) 0%, rgba(255, 255, 255, 0.2) 30%, transparent 100%)",
            }}
            aria-hidden
          />
          <div className="absolute inset-0 z-20 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100">
          <h3 className="font-gta text-lg text-white">{item.title}</h3>
          {item.price && (
            <p className="mt-1 font-mono text-sm text-accent-500">{item.price}</p>
          )}
          <button
            type="button"
            onClick={onInquire}
            className="mt-3 w-fit font-gta text-sm text-white underline-offset-4 transition-all hover:underline hover:drop-shadow-[0_0_12px_rgba(255,90,95,0.6)]"
          >
            INQUIRE
          </button>
          </div>
        </div>
      </div>
    </motion.div>
    </Link>
  );
}
