"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useSoundEffect } from "@/hooks/useSoundEffect";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function MagneticButton({
  children,
  className = "",
  onClick,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { stiffness: 300, damping: 25 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);
  const playThud = useSoundEffect(0.1);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const maxOffset = 12;

    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;

    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const strength = Math.min(distance / 100, 1);
    const pullX = (deltaX / distance) * maxOffset * strength;
    const pullY = (deltaY / distance) * maxOffset * strength;

    x.set(pullX);
    y.set(pullY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => playThud()}
      className={`relative overflow-hidden rounded-full border-[0.5px] border-parchment-100/30 bg-transparent px-6 py-3 font-heading text-sm tracking-widest text-parchment-100 transition-all duration-300 hover:border-transparent hover:bg-gradient-to-r hover:from-accent-500 hover:to-ember-500 hover:text-void-950 hover:drop-shadow-[0_0_20px_rgba(255,90,95,0.6)] ${className}`}
    >
      <motion.span
        className="inline-block"
        style={{
          x: xSpring,
          y: ySpring,
        }}
      >
        {children}
      </motion.span>
    </button>
  );
}
