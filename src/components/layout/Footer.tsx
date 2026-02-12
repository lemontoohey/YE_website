import Link from "next/link";
import { ArrowRight, Mail, MapPin, Phone, Instagram, Linkedin } from "lucide-react";

const socialLinks = [
  { href: "#", icon: Instagram, label: "Instagram" },
  { href: "#", icon: Linkedin, label: "LinkedIn" },
];

export function Footer() {
  return (
    <footer className="border-t border-parchment-100/10 bg-blood-950">
      {/* Get in Touch CTA */}
      <div className="border-b border-parchment-100/10 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 font-heading text-2xl font-medium text-parchment-100 transition-colors hover:text-vermillion-500 sm:text-3xl lg:text-4xl"
          >
            Get in Touch
            <ArrowRight className="size-6 shrink-0 transition-transform group-hover:translate-x-1 sm:size-7 lg:size-8" />
          </Link>
        </div>
      </div>

      {/* 3 columns */}
      <div className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-xs font-medium tracking-widest uppercase text-parchment-100/50">
              Contact
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:hello@jeffreyepstein.com.au"
                  className="flex items-center gap-3 text-sm text-parchment-100/80 transition-colors hover:text-parchment-100"
                >
                  <Mail className="size-4 shrink-0 text-parchment-100/60" />
                  hello@jeffreyepstein.com.au
                </a>
              </li>
              <li>
                <a
                  href="tel:+61400000000"
                  className="flex items-center gap-3 text-sm text-parchment-100/80 transition-colors hover:text-parchment-100"
                >
                  <Phone className="size-4 shrink-0 text-parchment-100/60" />
                  +61 400 000 000
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-parchment-100/80">
                <MapPin className="mt-0.5 size-4 shrink-0 text-parchment-100/60" />
                <span>Sydney, Australia</span>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="mb-4 text-xs font-medium tracking-widest uppercase text-parchment-100/50">
              Social
            </h3>
            <ul className="flex gap-4">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={label}
                    className="flex size-10 items-center justify-center rounded-full border border-parchment-100/30 text-parchment-100/80 transition-colors hover:border-vermillion-500 hover:text-parchment-100"
                  >
                    <Icon className="size-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* SEO blurb */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="mb-4 text-xs font-medium tracking-widest uppercase text-parchment-100/50">
              About
            </h3>
            <p className="max-w-sm text-sm leading-relaxed text-parchment-100/80">
              Professional photography based in Sydney. Commercial, portrait, and
              editorial work for brands and individuals.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
