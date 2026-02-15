"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface BloodlineButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function BloodlineButton({
  children,
  className = "",
  onClick,
}: BloodlineButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      type="button"
      onClick={onClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`relative overflow-hidden border-0 bg-transparent px-6 py-4 font-heading text-sm tracking-widest text-accent-500 ${className}`}
      initial={false}
    >
      <motion.span
        className="absolute inset-0 z-0 origin-left bg-accent-500"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{
          type: "tween",
          duration: 0.5,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      />
      <span className="relative z-10 block mix-blend-difference text-parchment-100">
        {children}
      </span>
    </motion.button>
  );
}
