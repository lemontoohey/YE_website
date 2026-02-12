"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

const PARTICLE_COUNT = 20;

function seededRandom(seed: number) {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
}

export function ParticleBackground() {
  const particles = useMemo(() => {
    return Array.from({ length: PARTICLE_COUNT }, (_, i) => {
      const r = seededRandom(i);
      const r2 = seededRandom(i + 100);
      const r3 = seededRandom(i + 200);
      return {
        id: i,
        left: `${r * 100}%`,
        bottom: `${r2 * 20}%`,
        duration: 10 + r3 * 10,
        delay: r * 5,
        opacityMin: 0.2,
        opacityMax: 0.2 + (i % 4) * 0.1,
        sway: 20 + (i % 5) * 10,
      };
    });
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute h-1 w-1 rounded-full bg-vermillion-500"
          style={{
            left: p.left,
            bottom: p.bottom,
          }}
          initial={{
            y: 0,
            x: 0,
            opacity: p.opacityMin,
          }}
          animate={{
            y: "-110vh",
            x: [0, p.sway, -p.sway, p.sway, 0],
            opacity: [
              p.opacityMin,
              p.opacityMax,
              p.opacityMin,
              p.opacityMax,
              p.opacityMin,
            ],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            repeatDelay: 2 + (p.id % 3),
          }}
        />
      ))}
    </div>
  );
}
