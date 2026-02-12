"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
      <AnimatePresence>
        {!isExited && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex flex-col"
          >
            {/* Top gate */}
            <motion.div
              className="flex flex-1 flex-col overflow-hidden bg-blood-950"
              initial={{ y: 0 }}
              animate={{ y: isEntered ? "-100%" : 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative flex flex-1 flex-col items-center justify-end px-8 pb-8">
                <div className="relative w-full max-w-2xl">
                  <p className="font-mono text-[10px] leading-relaxed text-parchment-100/50">
                    {DOCUMENT_TEXT}
                  </p>
                  {[0, 1, 2, 3, 4].map((i) => (
                    <motion.div
                      key={i}
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{
                        delay: 0.2 + i * 0.15,
                        duration: 0.3,
                        ease: "easeOut",
                      }}
                      className="absolute left-0 h-3 bg-black"
                      style={{ top: `${15 + i * 18}%` }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Center: name + button */}
            <div className="flex shrink-0 flex-col items-center justify-center gap-4 bg-blood-950 py-6">
              <motion.span
                className="font-heading text-2xl tracking-[0.3em] text-vermillion-500 sm:text-3xl"
                style={{
                  textShadow: "0 0 20px rgba(207, 46, 46, 0.4)",
                }}
              >
                JEFFREY EPSTEIN
              </motion.span>
              <button
                type="button"
                onClick={handleDeclassify}
                className="border border-vermillion-500 px-6 py-2 font-mono text-xs tracking-widest text-vermillion-500 transition-colors hover:bg-vermillion-500/10"
              >
                DECLASSIFY
              </button>
            </div>

            {/* Bottom gate */}
            <motion.div
              className="flex flex-1 flex-col overflow-hidden bg-blood-950"
              initial={{ y: 0 }}
              animate={{ y: isEntered ? "100%" : 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative flex flex-1 flex-col items-center justify-start px-8 pt-8">
                <div className="relative w-full max-w-2xl">
                  <p className="font-mono text-[10px] leading-relaxed text-parchment-100/50">
                    {DOCUMENT_TEXT}
                  </p>
                  {[0, 1, 2, 3, 4].map((i) => (
                    <motion.div
                      key={i}
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{
                        delay: 0.5 + i * 0.15,
                        duration: 0.3,
                        ease: "easeOut",
                      }}
                      className="absolute left-0 h-3 bg-black"
                      style={{ top: `${10 + i * 22}%` }}
                    />
                  ))}
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
