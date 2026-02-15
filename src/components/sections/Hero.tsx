"use client";

import { useRef, useCallback, useState, useEffect } from "react";
import { motion, useSpring, useMotionValueEvent } from "framer-motion";

const SPOTLIGHT_RADIUS = 200;
const SPRING_CONFIG = { stiffness: 80, damping: 25 };

function useSpringValue(spring: ReturnType<typeof useSpring>) {
  const [value, setValue] = useState(0.5);
  useMotionValueEvent(spring, "change", setValue);
  return value;
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const springX = useSpring(0.5, SPRING_CONFIG);
  const springY = useSpring(0.5, SPRING_CONFIG);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      springX.set(x);
      springY.set(y);
    },
    [springX, springY]
  );

  const x = useSpringValue(springX);
  const y = useSpringValue(springY);

  const [headlineOpacity, setHeadlineOpacity] = useState(0.4);
  useEffect(() => {
    const dist = Math.hypot(x - 0.5, y - 0.5);
    const near = dist < 0.4;
    setHeadlineOpacity(near ? 1 : 0.35);
  }, [x, y]);

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-void-950 pt-[4.5rem]"
    >
      <div className="relative flex flex-1 flex-col items-center justify-center px-6 text-center">
        <motion.h1
          className="font-gta text-7xl leading-tight text-white text-outline-gta drop-shadow-2xl md:text-9xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: headlineOpacity, y: 0 }}
          transition={{
            opacity: { duration: 0.3 },
            y: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
          }}
        >
          THE COLLECTION
        </motion.h1>
        <motion.p
          className="mt-6 font-mono text-sm tracking-widest text-accent-500 md:text-base"
          initial={{ opacity: 0.6 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          CASE FILE #2024-SYD // JEFFREY EPSTEIN
        </motion.p>
      </div>
    </section>
  );
}
