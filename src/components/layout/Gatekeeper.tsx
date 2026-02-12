"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TextDecrypt } from "@/components/ui/TextDecrypt";

const DOCUMENT_TEXT = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;

export function Gatekeeper({ children }: { children: React.ReactNode }) {
  const [isEntered, setIsEntered] = useState(false);
  const [isExited, setIsExited] = useState(false);

  const handleDeclassify = () => {
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
            {/* Top gate */}
            <motion.div
              className="flex flex-1 flex-col overflow-hidden bg-void-950"
              initial={{ y: 0 }}
              animate={{ y: isEntered ? "-100%" : 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
            >
              <div className="relative flex flex-1 flex-col items-center justify-end px-8 pb-8">
                <div className="relative w-full max-w-2xl">
                  <p className="font-mono text-[10px] leading-relaxed text-parchment-100/50">
                    {DOCUMENT_TEXT}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Center: name + button */}
            <div className="flex shrink-0 flex-col items-center justify-center gap-4 bg-void-950 py-6">
              <span
                className="text-2xl tracking-[0.3em] text-vermillion-500 sm:text-3xl [text-shadow:0_0_20px_rgba(200,62,54,0.4)]"
              >
                <TextDecrypt text="JEFFREY EPSTEIN" duration={1.5} />
              </span>
              <motion.button
                type="button"
                onClick={handleDeclassify}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  opacity: { delay: 1.0, duration: 0.4 },
                  scale: {
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
                whileHover={{
                  backgroundColor: "#C83E36",
                  boxShadow: "0px 0px 25px 5px rgba(255, 226, 204, 0.5)",
                  transition: { type: "spring", stiffness: 300, damping: 20 },
                }}
                whileTap={{ scale: 0.98 }}
                className="bg-vermillion-600 px-8 py-3 font-heading text-sm tracking-widest text-parchment-100"
              >
                DECLASSIFY
              </motion.button>
            </div>

            {/* Bottom gate */}
            <motion.div
              className="flex flex-1 flex-col overflow-hidden bg-void-950"
              initial={{ y: 0 }}
              animate={{ y: isEntered ? "100%" : 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
            >
              <div className="relative flex flex-1 flex-col items-center justify-start px-8 pt-8">
                <div className="relative w-full max-w-2xl">
                  <p className="font-mono text-[10px] leading-relaxed text-parchment-100/50">
                    {DOCUMENT_TEXT}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </>
  );
}
