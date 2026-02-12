import { Mail, Instagram } from "lucide-react";

const inputBase =
  "w-full border-b border-slate-300 bg-transparent py-3 outline-none transition-colors placeholder:text-slate-400 focus:border-black";

export function ContactSection() {
  return (
    <section className="bg-zinc-50 px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-xl">
        <h2 className="text-center font-serif text-3xl font-medium text-slate-950 sm:text-4xl">
          Let&apos;s create something timeless.
        </h2>
        <p className="mt-4 text-center text-slate-600">
          Available for commissions in Sydney & Melbourne.
        </p>

        <form className="mt-12" noValidate>
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
            className="mt-10 w-full bg-slate-950 px-6 py-4 text-sm font-medium text-white transition-colors hover:bg-slate-800"
          >
            Send Enquiry
          </button>
        </form>

        {/* Secondary contact */}
        <div className="mt-16 flex flex-wrap justify-center gap-6">
          <a
            href="mailto:hello@jeffreyepstein.com.au"
            className="flex items-center gap-2 text-sm text-slate-600 transition-colors hover:text-slate-950"
            aria-label="Email"
          >
            <Mail className="size-4" />
            <span>hello@jeffreyepstein.com.au</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-2 text-sm text-slate-600 transition-colors hover:text-slate-950"
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
