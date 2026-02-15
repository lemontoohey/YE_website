"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const HOLD_DURATION = 800;

interface RedactedPriceProps {
  price: string;
  label: string;
}

export function RedactedPrice({ price, label }: RedactedPriceProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const holdTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const progressIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const reset = useCallback(() => {
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
    setIsHolding(false);
    setProgress(0);
  }, []);

  const handlePointerDown = () => {
    if (isRevealed) return;
    setIsHolding(true);
    setProgress(0);

    const tick = 50;
    let elapsed = 0;

    progressIntervalRef.current = setInterval(() => {
      elapsed += tick;
      const p = Math.min((elapsed / HOLD_DURATION) * 100, 100);
      setProgress(p);
    }, tick);

    holdTimerRef.current = setTimeout(() => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
      holdTimerRef.current = null;
      setIsRevealed(true);
      setIsHolding(false);
      setProgress(100);
    }, HOLD_DURATION);
  };

  const handlePointerUp = () => {
    if (isRevealed) return;
    reset();
  };

  const handlePointerLeave = () => {
    if (isRevealed) return;
    reset();
  };

  return (
    <div className="relative overflow-hidden rounded border border-parchment-100/20 bg-void-950/50 p-6">
      <p className="mb-1 text-xs uppercase tracking-widest text-parchment-100/60">
        {label}
      </p>

      <div className="relative min-h-[2.5rem]">
        <AnimatePresence mode="wait">
          {isRevealed ? (
            <motion.p
              key="revealed"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="font-heading text-2xl font-bold text-parchment-100"
            >
              {price}
            </motion.p>
          ) : (
            <motion.div
              key="redacted"
              className="relative"
              initial={false}
              animate={{
                x: isHolding ? [0, -2, 2, -1, 1, 0] : 0,
              }}
              transition={{
                x: {
                  duration: 0.12,
                  repeat: isHolding ? Infinity : 0,
                },
              }}
            >
              <span className="invisible font-heading text-2xl font-bold">
                {price}
              </span>

              <div
                className="absolute inset-0 flex cursor-progress flex-col items-center justify-center bg-black"
                onPointerDown={handlePointerDown}
                onPointerUp={handlePointerUp}
                onPointerLeave={handlePointerLeave}
                onPointerCancel={handlePointerUp}
              >
                <span className="text-[10px] font-mono tracking-widest text-parchment-100/50">
                  HOLD TO DECRYPT
                </span>
                <div className="absolute bottom-0 left-0 right-0 h-0.5 overflow-hidden bg-parchment-100/10">
                  <motion.div
                    className="h-full bg-accent-500"
                    initial={false}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.05 }}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
