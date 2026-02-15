"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TextDecrypt } from "@/components/ui/TextDecrypt";

export function Gatekeeper({ children }: { children: React.ReactNode }) {
  const [isEntered, setIsEntered] = useState(false);
  const [isExited, setIsExited] = useState(false);

  const handleEnter = () => {
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
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#090205]"
          >
            <motion.div
              className="flex flex-1 flex-col overflow-hidden bg-[#090205]"
              initial={{ y: 0 }}
              animate={{ y: isEntered ? "-100%" : 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
            >
              <div className="flex min-h-screen flex-col items-center justify-center gap-8 px-4">
                <span className="font-heading text-2xl tracking-[0.5em] text-parchment-100 sm:text-3xl">
                  <TextDecrypt text="JEFFREY EPSTEIN" duration={1.5} />
                </span>
                <motion.button
                  type="button"
                  onClick={handleEnter}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.8, duration: 0.8, ease: "easeOut" }}
                  className="font-body text-sm tracking-[0.3em] text-parchment-100/90 transition-colors duration-300 hover:text-accent-500 hover:drop-shadow-[0_0_20px_rgba(255,90,95,0.6)] hover:[text-shadow:0_0_20px_rgba(255,90,95,0.4)] animate-power-surge"
                >
                  ENTER
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
