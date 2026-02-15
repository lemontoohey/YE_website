"use client";

import { useState } from "react";

export function TheWatchlist() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="border-t border-white/10 bg-void-950 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-xl text-center">
        <h2 className="font-gta text-4xl font-normal text-white sm:text-5xl md:text-6xl">
          NEWSLETTER
        </h2>
        <p className="mt-4 font-mono text-accent-500">
          Updates on new works and exhibitions.
        </p>

        <form
          className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-center"
          onSubmit={handleSubmit}
        >
          <div className="flex-1 sm:max-w-md">
            <label htmlFor="watchlist-email" className="sr-only">
              Email
            </label>
            <input
              id="watchlist-email"
              type="email"
              name="email"
              placeholder="EMAIL"
              required
              className="w-full border-b border-white/20 bg-transparent py-3 font-mono text-white outline-none transition-colors placeholder:text-white/30 focus:border-accent-500"
            />
          </div>
          <button
            type="submit"
            className="font-mono text-accent-500 transition-all hover:underline hover:drop-shadow-[0_0_12px_rgba(255,90,95,0.6)] sm:flex-shrink-0"
          >
            SUBSCRIBE
          </button>
        </form>
      </div>
    </section>
  );
}
