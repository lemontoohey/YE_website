"use client";

import { useState } from "react";

const DOSSIER_PDF = "/docs/dossier.pdf";

export function TheWatchlist() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    // Trigger download of Collector's Dossier
    const a = document.createElement("a");
    a.href = DOSSIER_PDF;
    a.download = "collectors-dossier.pdf";
    a.target = "_blank";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <section className="border-t border-white/10 bg-void-950 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-xl text-center">
        <h2 className="font-gta text-4xl font-normal text-white sm:text-5xl md:text-6xl">
          NEWSLETTER
        </h2>
        <p className="mt-4 font-mono text-sm text-accent-500">
          Join the mailing list to receive the &apos;Collector&apos;s Dossier&apos; (PDF)—a guide on archiving and investing in contemporary satire.
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
              disabled={submitted}
              className="w-full border-b border-white/20 bg-transparent py-3 font-mono text-white outline-none transition-colors placeholder:text-white/30 focus:border-accent-500 disabled:opacity-70"
            />
          </div>
          <button
            type="submit"
            disabled={submitted}
            className="min-w-[200px] rounded border border-dashed border-white/40 bg-transparent px-6 py-3 font-mono text-sm text-accent-500 transition-all hover:border-accent-500 hover:drop-shadow-[0_0_12px_rgba(255,90,95,0.6)] disabled:opacity-70 sm:flex-shrink-0"
          >
            {submitted ? "DOWNLOAD STARTED" : "REQUEST DOSSIER"}
          </button>
        </form>
      </div>
    </section>
  );
}
