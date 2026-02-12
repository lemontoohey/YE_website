"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

const PARTICLE_COUNT = 24;

const COLORS = ["bg-crime-yellow", "bg-vice-pink", "bg-white"] as const;

function seededRandom(seed: number) {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
}

function pickColor(seed: number): (typeof COLORS)[number] {
  const r = seededRandom(seed);
  const idx = Math.floor(r * 3);
  return COLORS[idx];
}

export function ParticleBackground() {
  const particles = useMemo(() => {
    return Array.from({ length: PARTICLE_COUNT }, (_, i) => {
      const r = seededRandom(i);
      const r2 = seededRandom(i + 100);
      const r3 = seededRandom(i + 200);
      const r4 = seededRandom(i + 300);
      const duration = 2 + r3 * 4;
      const sway = 30 + r * 80;
      const swayWobble = [0, sway, -sway * 0.8, sway * 1.2, -sway * 0.4, sway * 0.9, 0];
      return {
        id: i,
        left: `${r * 100}%`,
        bottom: `${r2 * 25}%`,
        duration,
        delay: r * 2,
        opacityMin: 0.4,
        opacityMax: 0.8,
        sway: swayWobble,
        color: pickColor(i + 500),
        size: 4 + (i % 4) * 2,
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
          className={`absolute rounded-none blur-[1px] ${p.color}`}
          style={{
            left: p.left,
            bottom: p.bottom,
            width: p.size,
            height: p.size,
          }}
          initial={{
            y: 0,
            x: 0,
            opacity: p.opacityMin,
          }}
          animate={{
            y: "-120vh",
            x: p.sway,
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
            repeatDelay: 0.5 + (p.id % 2),
          }}
        />
      ))}
    </div>
  );
}
