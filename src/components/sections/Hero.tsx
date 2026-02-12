"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1000&auto=format&fit=crop";

const fadeUp = {
  initial: { opacity: 0, y: 24, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
};

export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden lg:flex-row">
      {/* Text block */}
      <div className="flex flex-1 flex-col justify-center px-6 py-20 lg:pl-12 lg:pr-16 xl:pl-20">
        <motion.div
          initial={fadeUp.initial}
          animate={fadeUp.animate}
          transition={fadeUp.transition}
          className="max-w-xl"
        >
          <h1 className="font-serif text-4xl font-medium leading-tight text-slate-950 sm:text-5xl md:text-6xl lg:text-7xl">
            Capturing Architecture & Life.
          </h1>
          <p className="mt-6 text-lg text-slate-600 sm:text-xl">
            Sydney based Commercial & Portrait Photography.
          </p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10"
          >
            <Link
              href="/work"
              className="inline-flex items-center border border-slate-950 px-6 py-3 text-sm font-medium text-slate-950 transition-colors hover:bg-slate-950 hover:text-slate-50"
            >
              View Portfolio
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Image block */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative aspect-[4/5] w-full lg:aspect-auto lg:h-screen lg:w-[45%] xl:w-[50%]"
      >
        <Image
          src={HERO_IMAGE}
          alt="Portfolio shot – professional photography"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
      </motion.div>
    </section>
  );
}
