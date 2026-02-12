"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

const PARTICLE_COUNT = 20;

const COLORS = [
  "bg-vermillion-500",
  "bg-ember-500",
  "bg-cream-200",
] as const;

function seededRandom(seed: number) {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
}

function pickColor(seed: number): (typeof COLORS)[number] {
  const r = seededRandom(seed);
  const idx = r < 0.1 ? 2 : r < 0.55 ? 0 : 1;
  return COLORS[idx];
}

export function ParticleBackground() {
  const particles = useMemo(() => {
    return Array.from({ length: PARTICLE_COUNT }, (_, i) => {
      const r = seededRandom(i);
      const r2 = seededRandom(i + 100);
      const r3 = seededRandom(i + 200);
      const r4 = seededRandom(i + 300);
      const isSpark = r4 < 0.4;
      const duration = isSpark ? 3 + r3 * 7 : 12 + r3 * 14;
      const sway = 15 + r * 50;
      const swayWobble = [0, sway, -sway * 0.7, sway * 1.3, -sway * 0.5, sway * 0.6, 0];
      return {
        id: i,
        left: `${r * 100}%`,
        bottom: `${r2 * 20}%`,
        duration,
        delay: r * 5,
        opacityMin: 0.15,
        opacityMax: 0.2 + (i % 4) * 0.12,
        sway: swayWobble,
        color: pickColor(i + 500),
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
          className={`absolute h-1 w-1 rounded-full blur-[1px] ${p.color}`}
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
            repeatDelay: 2 + (p.id % 3),
          }}
        />
      ))}
    </div>
  );
}
