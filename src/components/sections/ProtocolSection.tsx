"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PROTOCOLS = [
  {
    q: "GLOBAL SHIPPING",
    a: "Yes. Evidence is shipped worldwide via secure courier in reinforced tubes.",
  },
  {
    q: "AUTHENTICITY",
    a: "All works come with a signed Certificate of Authenticity (COA) and a unique case number.",
  },
  {
    q: "FRAMING",
    a: "Prints are sold unframed to ensure safe transport. We recommend custom framing upon receipt.",
  },
  {
    q: "TIMELINE",
    a: "Orders are processed within 3-5 business days.",
  },
];

export function ProtocolSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-void-950 px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <h2 className="font-gta text-3xl text-white sm:text-4xl">
          OPERATIONAL PROTOCOLS
        </h2>
        <p className="mt-2 font-mono text-sm text-accent-500">
          Shipping, Handling, and Chain of Custody.
        </p>

        <ul className="mt-10">
          {PROTOCOLS.map((item, i) => (
            <li
              key={item.q}
              className="border-b border-white/10"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 py-4 text-left font-warning text-white transition-colors hover:text-accent-500"
              >
                <span>{item.q}</span>
                <span
                  className={`shrink-0 text-xl transition-transform duration-200 ${
                    openIndex === i ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>
              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="pb-4 font-mono text-sm leading-relaxed text-white/60">
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
