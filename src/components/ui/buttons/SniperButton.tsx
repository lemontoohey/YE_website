"use client";

import { motion } from "framer-motion";

interface SniperButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function SniperButton({
  children,
  className = "",
  onClick,
}: SniperButtonProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={`relative inline-flex items-center justify-center px-6 py-3 font-heading text-sm tracking-widest text-parchment-100 ${className}`}
      whileHover="hover"
      initial="idle"
      variants={{
        idle: {},
        hover: {},
      }}
    >
      {/* Corner brackets - animate in from corners */}
      <motion.span
        className="pointer-events-none absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-vermillion-500"
        variants={{
          idle: { opacity: 0, x: -4, y: -4 },
          hover: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: { duration: 0.25, ease: "easeOut" },
          },
        }}
      />
      <motion.span
        className="pointer-events-none absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2 border-vermillion-500"
        variants={{
          idle: { opacity: 0, x: 4, y: -4 },
          hover: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: { duration: 0.25, ease: "easeOut" },
          },
        }}
      />
      <motion.span
        className="pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-vermillion-500"
        variants={{
          idle: { opacity: 0, x: -4, y: 4 },
          hover: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: { duration: 0.25, ease: "easeOut" },
          },
        }}
      />
      <motion.span
        className="pointer-events-none absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-vermillion-500"
        variants={{
          idle: { opacity: 0, x: 4, y: 4 },
          hover: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: { duration: 0.25, ease: "easeOut" },
          },
        }}
      />

      <motion.span
        variants={{
          idle: { scale: 1 },
          hover: { scale: 1.05, transition: { duration: 0.2 } },
        }}
      >
        {children}
      </motion.span>
    </motion.button>
  );
}
