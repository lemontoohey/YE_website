"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, LockOpen } from "lucide-react";

export function TheWatchlist() {
  const [isLocked, setIsLocked] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLocked(true);
  };

  return (
    <section className="relative border-t border-parchment-100/10 bg-blood-950 px-4 py-24 sm:px-6 lg:px-8">
      {/* Noise texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative mx-auto max-w-xl">
        <h2 className="text-center font-heading text-3xl font-medium tracking-[0.2em] text-parchment-100 sm:text-4xl">
          THE WATCHLIST
        </h2>
        <p className="mt-4 text-center font-body text-lg italic text-parchment-100/70">
          Join the dossier. Access drops before the public. 0% Spam, 100%
          Clearance.
        </p>

        <form
          className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-end"
          onSubmit={handleSubmit}
        >
          <div className="flex-1">
            <label htmlFor="watchlist-email" className="sr-only">
              Codename or email
            </label>
            <input
              id="watchlist-email"
              type="email"
              name="email"
              placeholder="CODENAME / EMAIL"
              required
              className="w-full border-b border-vermillion-500/50 bg-transparent py-3 font-mono text-sm text-parchment-100 outline-none transition-colors placeholder:font-mono placeholder:text-parchment-100/40 focus:border-vermillion-500"
              style={{ fontFamily: "'Courier New', Courier, monospace" }}
            />
          </div>
          <div className="flex items-center gap-3">
            <button
              type="submit"
              className="flex items-center gap-2 font-mono text-xs tracking-widest text-vermillion-500 transition-all duration-300 hover:text-parchment-100"
              style={{
                textShadow: "0 0 8px transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.textShadow =
                  "0 0 20px rgba(255, 226, 204, 0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.textShadow = "0 0 8px transparent";
              }}
            >
              ENCRYPT & SEND
            </button>
            <motion.div
              key={isLocked ? "locked" : "unlocked"}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              {isLocked ? (
                <Lock className="size-4 text-vermillion-500" />
              ) : (
                <LockOpen className="size-4 text-parchment-100/60" />
              )}
            </motion.div>
          </div>
        </form>
      </div>
    </section>
  );
}
