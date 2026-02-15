"use client";

import { Mail, Instagram } from "lucide-react";
import { useEffect, useRef } from "react";

const inputBase =
  "w-full border-b-2 border-white/20 bg-transparent py-4 text-lg font-mono text-white outline-none transition-colors placeholder:uppercase placeholder:tracking-widest placeholder:text-white/30 focus:border-accent-500";

export function ContactSection() {
  const messageRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const prefill = sessionStorage.getItem("inquiryMessage");
    if (prefill && messageRef.current) {
      messageRef.current.value = prefill;
      sessionStorage.removeItem("inquiryMessage");
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <section id="contact" className="bg-void-950 px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-2 lg:items-center">
        {/* Left - Text */}
        <div>
          <h2 className="font-gta text-6xl font-normal text-white drop-shadow-lg md:text-8xl animate-power-surge">
            COMMISSIONS
          </h2>
          <p className="mt-6 font-warning text-lg font-bold text-accent-500 md:text-xl">
            AVAILABLE FOR SYDNEY & MELBOURNE ASSIGNMENTS.
          </p>
        </div>

        {/* Right - Form */}
        <form className="max-w-xl" noValidate onSubmit={handleSubmit}>
          <div className="space-y-8">
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Name"
                required
                className={inputBase}
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Email"
                required
                className={inputBase}
              />
            </div>
            <div>
              <label htmlFor="service" className="sr-only">
                Service Type
              </label>
              <select
                id="service"
                name="service"
                required
                className={`${inputBase} cursor-pointer`}
              >
                <option value="" disabled>
                  SERVICE TYPE
                </option>
                <option value="portrait">Portrait</option>
                <option value="commercial">Commercial</option>
                <option value="event">Event</option>
              </select>
            </div>
            <div>
              <label htmlFor="message" className="sr-only">
                Message
              </label>
              <textarea
                ref={messageRef}
                id="message"
                name="message"
                placeholder="Message"
                rows={4}
                required
                className={`${inputBase} resize-none`}
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-10 w-full rounded-none bg-white px-6 py-4 font-mono text-sm font-medium text-black transition-all hover:bg-accent-500 hover:text-white hover:drop-shadow-[0_0_20px_rgba(255,90,95,0.6)]"
          >
            SEND MESSAGE
          </button>

          <div className="mt-16 flex flex-wrap gap-6">
            <a
              href="mailto:hello@jeffreyepstein.com.au"
              className="flex items-center gap-2 font-mono text-sm text-parchment-100/80 transition-colors hover:text-parchment-100"
              aria-label="Email"
            >
              <Mail className="size-4" />
              <span>hello@jeffreyepstein.com.au</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-2 font-mono text-sm text-parchment-100/80 transition-colors hover:text-parchment-100"
              aria-label="Instagram"
            >
              <Instagram className="size-4" />
              <span>@jeffreyepsteinphoto</span>
            </a>
          </div>
        </form>
      </div>
    </section>
  );
}
