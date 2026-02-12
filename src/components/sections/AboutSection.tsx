import Image from "next/image";
import { SITE_CONTENT } from "@/lib/data";

export function AboutSection() {
  return (
    <section id="about" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">
          {/* Text */}
          <div>
            <h2 className="font-heading text-3xl font-medium text-parchment-100 sm:text-4xl">
              Behind the Lens
            </h2>
            <div className="mt-8 space-y-6 text-parchment-100/80">
              {SITE_CONTENT.about.text.split("\n\n").map((paragraph, i) => (
                <p key={i} className="leading-relaxed">
                  {paragraph.split(/(Jeffrey Epstein)/g).map((part, j) =>
                    part === "Jeffrey Epstein" ? (
                      <strong key={j}>{part}</strong>
                    ) : (
                      part
                    )
                  )}
                </p>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="group relative aspect-[3/4] overflow-hidden lg:aspect-[4/5]">
            <Image
              src={SITE_CONTENT.about.image}
              alt="Jeffrey Epstein, Sydney photographer"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover grayscale transition-all duration-500 ease-out group-hover:grayscale-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
