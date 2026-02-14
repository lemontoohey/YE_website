"use client";

import { Mail, Instagram } from "lucide-react";

const inputBase =
  "w-full border-b border-parchment-100/30 bg-transparent py-3 text-parchment-100 outline-none transition-colors placeholder:text-parchment-100/50 focus:border-vermillion-500";

export function ContactSection() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };
  return (
    <section id="contact" className="border-t border-parchment-100/10 px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-xl">
        <h2 className="text-center font-warning text-3xl text-parchment-100 sm:text-4xl">
          COMMISSIONS
        </h2>
        <p className="mt-4 text-center text-parchment-100/80">
          Available for commissions in Sydney & Melbourne.
        </p>

        <form className="mt-12" noValidate onSubmit={handleSubmit}>
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
                  Service Type
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
            className="mt-10 w-full bg-vermillion-500 px-6 py-4 text-sm font-medium text-parchment-100 transition-colors hover:bg-vermillion-500/90"
          >
            Send Enquiry
          </button>
        </form>

        {/* Secondary contact */}
        <div className="mt-16 flex flex-wrap justify-center gap-6">
          <a
            href="mailto:hello@jeffreyepstein.com.au"
            className="flex items-center gap-2 text-sm text-parchment-100/80 transition-colors hover:text-parchment-100"
            aria-label="Email"
          >
            <Mail className="size-4" />
            <span>hello@jeffreyepstein.com.au</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-2 text-sm text-parchment-100/80 transition-colors hover:text-parchment-100"
            aria-label="Instagram"
          >
            <Instagram className="size-4" />
            <span>@jeffreyepsteinphoto</span>
          </a>
        </div>
      </div>
    </section>
  );
}
