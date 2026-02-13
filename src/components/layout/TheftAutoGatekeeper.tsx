"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useSoundEffect, useWhooshOnMount } from "@/hooks/useSoundEffect";
import { SITE_CONTENT } from "@/lib/data";

export function TheftAutoGatekeeper({ children }: { children: React.ReactNode }) {
  const [isEntered, setIsEntered] = useState(false);
  const [isExited, setIsExited] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const hasPlayedThudOnLand = useRef(false);
  const playThud = useSoundEffect(0.6);
  const playWhoosh = useWhooshOnMount(0.5);

  useEffect(() => {
    playWhoosh();
  }, [playWhoosh]);

  const handleImageComplete = () => {
    if (!hasPlayedThudOnLand.current) {
      hasPlayedThudOnLand.current = true;
      playThud();
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 200);
    }
  };

  const handleEnter = () => {
    playThud();
    setIsEntered(true);
    setTimeout(() => setIsExited(true), 900);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {!isExited && (
          <motion.div
            key="theft-auto-gatekeeper"
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-void-950"
            animate={
              isShaking
                ? { x: [0, -10, 10, -5, 5, 0] }
                : { x: 0 }
            }
            transition={
              isShaking
                ? { duration: 0.2, ease: "easeOut" }
                : { duration: 0 }
            }
          >
            <motion.div
              className="relative flex flex-col items-center justify-center"
              initial={{ y: 0 }}
              animate={{ y: isEntered ? "-100vh" : 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                className="relative max-w-3xl shrink-0 rotate-[-2deg] overflow-hidden shadow-2xl shadow-vermillion-500/20"
              >
                <motion.div
                  initial={{ scale: 2, opacity: 0, y: -200 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  transition={{
                    type: "spring",
                    bounce: 0.3,
                    duration: 0.8,
                  }}
                  onAnimationComplete={handleImageComplete}
                  className="relative aspect-[3/4] w-full min-w-[280px] sm:min-w-[360px]"
                >
                  <Image
                    src={SITE_CONTENT.hero.theftAutoCover}
                    alt="Theft Auto America"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 48rem"
                    priority
                  />
                </motion.div>
              </motion.div>

              <motion.button
                type="button"
                onClick={handleEnter}
                className="theft-auto-pulse mt-12 font-gta text-2xl text-white drop-shadow-lg sm:text-3xl"
              >
                ENTER
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </>
  );
}
