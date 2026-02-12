"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { SITE_CONTENT } from "@/lib/data";

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
          <h1 className="font-heading text-4xl font-medium leading-tight text-parchment-100 sm:text-5xl md:text-6xl lg:text-7xl">
            {SITE_CONTENT.hero.title}
          </h1>
          <p className="mt-6 text-lg text-parchment-100/80 sm:text-xl">
            {SITE_CONTENT.hero.subtitle}
          </p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10"
          >
            <Link
              href="/work"
              className="inline-flex items-center border border-vermillion-500 px-6 py-3 text-sm font-medium text-parchment-100 transition-colors hover:bg-vermillion-500"
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
          src={SITE_CONTENT.hero.image}
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
