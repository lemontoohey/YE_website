"use client";

import Image from "next/image";
import { SITE_CONTENT } from "@/lib/data";

const OFFERINGS = [
  "Digitized Original Artworks",
  "Canvas & Paper Prints",
  "Fashion Apparel",
  "Collector Merchandise",
  "Limited Edition Drops",
];

export function AboutSection() {
  return (
    <section id="about" className="bg-void-950 px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-stretch">
          {/* Left - Image (Full Color, Subtle Hover Zoom) */}
          <div className="group relative min-h-[400px] overflow-hidden lg:min-h-0 lg:h-full">
            <Image
              src={SITE_CONTENT.about.image}
              alt="Ye Yuan"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover grayscale-0 brightness-100 transition-transform duration-300 ease-out group-hover:scale-[1.02]"
            />
          </div>

          {/* Right - Bio (The Curator's File) */}
          <div className="flex flex-col border-l-2 border-accent-500 pl-8 md:pl-12">
            <h2 className="font-gta mb-8 text-5xl font-normal text-white">
              THE ARTIST: YE YUAN
            </h2>

            <div className="space-y-8 font-body text-lg leading-loose text-parchment-100 md:text-xl">
              <p>
                Ye Yuan is a known figure in Australia&apos;s underground and
                contemporary art scene. His work is provocative, absurd, and
                unfiltered reflecting a unique blend of satire, critique, and
                countercultural expression. Working in oils and acrylics, Ye
                Yuan&apos;s paintings span canvas and conceptual statements,
                often blurring the line between fine art and cultural commentary.
              </p>
              <p>
                All original artworks by Ye Yuan are created in Melbourne,
                Australia, and later digitized, professionally archived, and
                transformed into premium merchandise and collectibles available
                exclusively through our website.
              </p>
            </div>

            <h3 className="mt-10 font-bold uppercase tracking-[0.2em] text-sm text-accent-500">
              OUR VISION
            </h3>
            <div className="mt-4 space-y-8 font-body text-lg leading-loose text-parchment-100 md:text-xl">
              <p>
                We believe art should challenge, confront, and inspire. Ye
                Yuan&apos;s works are unapologetically bold, designed not for
                passive walls but for minds that engage with contradiction,
                discomfort, and dark humor.
              </p>
              <p>
                Whether you&apos;re a collector, admirer, or simply intrigued by
                the voice behind the brush — we welcome you to explore, question,
                and connect with a body of work that refuses to conform.
              </p>
            </div>

            {/* What We Offer */}
            <div className="mt-12 border-t border-white/10 pt-8">
              <ul className="grid grid-cols-1 gap-y-2 gap-x-4 font-mono text-sm text-parchment-100/80 md:grid-cols-2">
                {OFFERINGS.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="text-accent-500">+</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
