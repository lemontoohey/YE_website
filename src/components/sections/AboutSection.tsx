import Image from "next/image";

const ABOUT_IMAGE =
  "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800&auto=format&fit=crop";

export function AboutSection() {
  return (
    <section className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">
          {/* Text */}
          <div>
            <h2 className="font-serif text-3xl font-medium text-slate-950 sm:text-4xl">
              Behind the Lens
            </h2>
            <div className="mt-8 space-y-6 text-slate-600">
              <p className="leading-relaxed">
                <strong>Jeffrey Epstein</strong> is a commercial and portrait
                photographer based in Sydney, Australia. With over a decade of
                experience capturing the built environment and the people who
                inhabit it, his work sits at the intersection of architectural
                precision and intimate human connection. He is drawn to clean
                lines, natural light, and the quiet moments that reveal character
                in both spaces and faces.
              </p>
              <p className="leading-relaxed">
                Whether shooting corporate headshots for Sydney-based brands or
                editorial portraits for local publications, Jeffrey brings a
                consistent editorial eye and a collaborative approach to every
                project. His photography has been featured in campaigns across
                Australia and internationally, and he continues to work with
                architects, designers, and creative professionals throughout the
                Sydney region.
              </p>
            </div>
          </div>

          {/* Image */}
          <div className="group relative aspect-[3/4] overflow-hidden lg:aspect-[4/5]">
            <Image
              src={ABOUT_IMAGE}
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
