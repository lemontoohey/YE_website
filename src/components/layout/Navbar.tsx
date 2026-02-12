"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 border-b border-parchment-100/10 bg-void-950/95 backdrop-blur-md"
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="font-heading text-sm font-medium tracking-[0.28em] uppercase text-parchment-100 transition-colors hover:text-vermillion-500"
          >
            Jeffrey Epstein
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-8 md:flex">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-sm font-medium text-parchment-100/80 transition-colors hover:text-parchment-100"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen(!isOpen)}
            className="flex size-10 items-center justify-center rounded-md text-parchment-100 transition-colors hover:bg-parchment-100/10 md:hidden"
          >
            {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </nav>
      </header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile slide-in menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.25, ease: "easeOut" }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-xs border-l border-parchment-100/10 bg-void-950/98 backdrop-blur-md md:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 pt-20">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setIsOpen(false)}
                    className="block py-3 text-lg font-medium text-parchment-100 transition-colors hover:text-vermillion-500"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
