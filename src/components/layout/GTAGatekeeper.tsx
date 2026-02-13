"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useSoundEffect } from "@/hooks/useSoundEffect";
import { SITE_CONTENT } from "@/lib/data";

export function GTAGatekeeper({ children }: { children: React.ReactNode }) {
  const [isEntered, setIsEntered] = useState(false);
  const [isExited, setIsExited] = useState(false);
  const playThud = useSoundEffect(0.6);

  const handlePressStart = () => {
    playThud();
    setIsEntered(true);
    setTimeout(() => setIsExited(true), 900);
  };

  const imageStage = {
    initial: { scale: 1, filter: "grayscale(100%) contrast(200%) brightness(80%)" },
    animate: {
      scale: 1.1,
      filter: "grayscale(0%) contrast(100%) brightness(100%)",
    },
    transition: { duration: 1.5, delay: 1, ease: "easeOut" as const },
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {!isExited && (
          <div
            key="gta-gatekeeper"
            className="fixed inset-0 z-[100] flex flex-col overflow-hidden bg-gta-black"
          >
            {/* Top half - slides up on exit */}
            <motion.div
              className="relative h-1/2 w-full overflow-hidden"
              initial={{ y: 0 }}
              animate={{ y: isEntered ? "-100%" : 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
            >
              <motion.div
                className="absolute inset-0"
                initial={imageStage.initial}
                animate={imageStage.animate}
                transition={imageStage.transition}
              >
                <Image
                  src={SITE_CONTENT.hero.gtaImage ?? SITE_CONTENT.hero.image}
                  alt=""
                  fill
                  className="object-cover object-top"
                  sizes="100vw"
                  priority
                />
              </motion.div>
              <div
                className="absolute inset-0 opacity-[0.15] mix-blend-multiply"
                style={{
                  backgroundImage: "radial-gradient(circle, black 1px, transparent 1px)",
                  backgroundSize: "4px 4px",
                }}
              />
              <div className="absolute left-4 top-4 z-10 sm:left-8 sm:top-8">
                <h1 className="font-gta text-4xl font-normal text-white text-outline-gta sm:text-6xl md:text-8xl">
                  JEFFREY EPSTEIN
                </h1>
              </div>
            </motion.div>

            {/* Bottom half - slides down on exit */}
            <motion.div
              className="relative flex h-1/2 w-full flex-col overflow-hidden"
              initial={{ y: 0 }}
              animate={{ y: isEntered ? "100%" : 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
            >
              <motion.div
                className="absolute inset-0"
                initial={imageStage.initial}
                animate={imageStage.animate}
                transition={imageStage.transition}
              >
                <Image
                  src={SITE_CONTENT.hero.gtaImage ?? SITE_CONTENT.hero.image}
                  alt=""
                  fill
                  className="object-cover object-bottom"
                  sizes="100vw"
                  priority
                />
              </motion.div>
              <div
                className="absolute inset-0 opacity-[0.15] mix-blend-multiply"
                style={{
                  backgroundImage: "radial-gradient(circle, black 1px, transparent 1px)",
                  backgroundSize: "4px 4px",
                }}
              />
              <div className="absolute bottom-24 right-4 z-10 sm:right-8">
                <p className="font-gta text-4xl font-normal text-gta-pink sm:text-6xl md:text-7xl">
                  PHOTOGRAPHY
                </p>
              </div>
              <motion.button
                type="button"
                onClick={handlePressStart}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5, duration: 0.5 }}
                className="gta-blink absolute bottom-6 left-1/2 z-20 -translate-x-1/2 font-gta text-2xl text-gta-yellow sm:text-4xl"
              >
                PRESS START
              </motion.button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {children}
    </>
  );
}
