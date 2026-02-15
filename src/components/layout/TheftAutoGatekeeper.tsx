"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence, useSpring, useMotionValueEvent } from "framer-motion";
import { useSoundEffect, useWhooshOnMount } from "@/hooks/useSoundEffect";

const GTA_COVER_IMAGE = "/images/gta_cover.jpg";
const SPOTLIGHT_RADIUS = 280;
const PARALLAX_MAX = 15;
const SPRING_CONFIG = { stiffness: 100, damping: 30 };

function useSpringValue(spring: ReturnType<typeof useSpring>) {
  const [value, setValue] = useState(0.5);
  useMotionValueEvent(spring, "change", setValue);
  return value;
}

export function TheftAutoGatekeeper({ children }: { children: React.ReactNode }) {
  const [isEntered, setIsEntered] = useState(false);
  const [isExited, setIsExited] = useState(false);
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const playThud = useSoundEffect(0.6);
  const playWhoosh = useWhooshOnMount(0.5);

  const springX = useSpring(0.08, SPRING_CONFIG);
  const springY = useSpring(0.08, SPRING_CONFIG);

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (mounted) playWhoosh();
  }, [mounted, playWhoosh]);

  // Spotlight travels from top-left to face of figure (by car hood)
  useEffect(() => {
    if (!mounted) return;
    const t = setTimeout(() => {
      springX.set(0.78);
      springY.set(0.45);
    }, 100);
    return () => clearTimeout(t);
  }, [mounted, springX, springY]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      springX.set(x);
      springY.set(y);
    },
    [springX, springY]
  );

  const handleEnter = () => {
    playThud();
    setIsEntered(true);
    setTimeout(() => setIsExited(true), 900);
  };

  const overlay = (
    <AnimatePresence mode="wait">
      {!isExited && (
        <motion.div
          key="theft-auto-gatekeeper"
          ref={containerRef}
          onMouseMove={handleMouseMove}
          className="fixed inset-0 z-[100] flex h-screen w-full flex-col overflow-hidden bg-void-950"
          initial={{ y: 0 }}
          animate={{ y: isEntered ? "-100vh" : 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Top Section - 85% - Art + Spotlight */}
          <div className="relative flex flex-1 overflow-hidden">
            <ArtWithSpotlight springX={springX} springY={springY} />
            <GrainOverlay />
          </div>

          {/* Bottom Section - 15% - The Void */}
          <div className="relative z-50 flex h-32 shrink-0 items-center justify-center bg-black">
            <motion.button
              type="button"
              onClick={handleEnter}
              className="font-gta text-4xl text-white transition-all duration-300 hover:text-accent-500 hover:drop-shadow-[0_0_25px_rgba(255,90,95,0.6)] bg-transparent border-none outline-none animate-power-surge"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.98 }}
            >
              ENTER
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      {mounted &&
        typeof document !== "undefined" &&
        createPortal(overlay, document.body)}
      {children}
    </>
  );
}

function ArtWithSpotlight({
  springX,
  springY,
}: {
  springX: ReturnType<typeof useSpring>;
  springY: ReturnType<typeof useSpring>;
}) {
  const x = useSpringValue(springX);
  const y = useSpringValue(springY);
  const parallaxX = (x - 0.5) * -PARALLAX_MAX * 2;
  const parallaxY = (y - 0.5) * -PARALLAX_MAX * 2;

  return (
    <>
      {/* Dimmed base - full image, aligned right */}
      <div className="absolute inset-0 flex items-center pr-4 md:pr-12">
        <div
          className="relative h-full w-full"
          style={{
            transform: `translate(${parallaxX}px, ${parallaxY}px)`,
          }}
        >
          <Image
            src={GTA_COVER_IMAGE}
            alt="Grand Theft Auto America"
            fill
            className="object-contain object-right"
            sizes="100vw"
            priority
            style={{
              filter: "brightness(0.5) saturate(0.6)",
              opacity: 0.4,
            }}
          />
        </div>
      </div>

      {/* Searchlight tint overlay - faint accent at outer edge */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center pr-4 md:pr-12"
        style={{
          background: `radial-gradient(circle ${SPOTLIGHT_RADIUS + 80}px at ${x * 100}% ${y * 100}%, transparent 40%, rgba(255, 90, 95, 0.06) 70%, rgba(255, 90, 95, 0.03) 100%)`,
        }}
      />
      {/* Bright image - revealed only in spotlight circle (mask) */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center pr-4 md:pr-12"
        style={{
          maskImage: `radial-gradient(circle ${SPOTLIGHT_RADIUS}px at ${x * 100}% ${y * 100}%, black 0%, transparent 70%)`,
          WebkitMaskImage: `radial-gradient(circle ${SPOTLIGHT_RADIUS}px at ${x * 100}% ${y * 100}%, black 0%, transparent 70%)`,
        }}
      >
        <div
          className="relative h-full w-full"
          style={{
            transform: `translate(${parallaxX}px, ${parallaxY}px)`,
          }}
        >
          <Image
            src={GTA_COVER_IMAGE}
            alt=""
            fill
            className="object-contain object-right"
            sizes="100vw"
            style={{ opacity: 1 }}
          />
        </div>
      </div>
    </>
  );
}

function GrainOverlay() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-10 opacity-[0.05]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      }}
    />
  );
}
