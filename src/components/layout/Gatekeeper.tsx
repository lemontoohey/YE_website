"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";
import { useSoundEffect } from "@/hooks/useSoundEffect";

export function Gatekeeper({ children }: { children: React.ReactNode }) {
  const [isEntered, setIsEntered] = useState(false);
  const [isExited, setIsExited] = useState(false);
  const playThud = useSoundEffect(0.6);

  const handlePressStart = () => {
    playThud();
    setIsEntered(true);
    setTimeout(() => setIsExited(true), 900);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {!isExited && (
          <motion.div
            key="gatekeeper-overlay"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex flex-col bg-void-950"
          >
            <motion.div
              className="flex flex-1 flex-col overflow-hidden bg-void-950"
              initial={{ y: 0 }}
              animate={{ y: isEntered ? "-100%" : 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
            >
              {/* Top Left: Mission Objective */}
              <div className="absolute left-4 top-4 z-10 sm:left-8 sm:top-8">
                <div className="bg-black px-4 py-2">
                  <p className="font-gta text-sm text-crime-yellow sm:text-base">
                    CURRENT OBJECTIVE: SURVIVE SYDNEY
                  </p>
                </div>
              </div>

              {/* Center Content */}
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-4 py-16">
                {/* Title - Ken Burns scale */}
                <motion.h1
                  className="font-gta text-6xl font-normal text-white text-stroke-2 drop-shadow-[0_4px_0_rgba(0,0,0,1)] md:text-9xl"
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 3, ease: "easeOut" }}
                >
                  JEFFREY EPSTEIN
                </motion.h1>

                {/* Subtitle */}
                <p className="font-gta text-lg text-vermillion-500 sm:text-xl md:text-2xl">
                  The Definitive Edition
                </p>

                {/* Wanted Stars */}
                <div className="flex gap-1">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0.3 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        delay: 1.5 + i * 0.3,
                        duration: 0.3,
                      }}
                    >
                      <Star
                        className="size-8 fill-crime-yellow text-crime-yellow"
                        strokeWidth={1.5}
                      />
                    </motion.div>
                  ))}
                </div>

                {/* PRESS START Button */}
                <motion.button
                  type="button"
                  onClick={handlePressStart}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 3.5, duration: 0.5 }}
                  className="gta-blink mt-6 rounded border-2 border-black bg-black px-8 py-3 font-gta text-lg text-crime-yellow outline outline-2 outline-black"
                >
                  PRESS START
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </>
  );
}
