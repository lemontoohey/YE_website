import { Mail, MapPin, Phone, Instagram, Linkedin } from "lucide-react";

const socialLinks = [
  { href: "#", icon: Instagram, label: "Instagram" },
  { href: "#", icon: Linkedin, label: "LinkedIn" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-void-950 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
        {/* Left: Contact Details */}
        <ul className="flex flex-col gap-2 font-mono text-sm text-white/60">
          <li>
            <a
              href="mailto:hello@jeffreyepstein.com.au"
              className="flex items-center gap-2 transition-colors hover:text-vermillion-500"
            >
              <Mail className="size-4 shrink-0" />
              hello@jeffreyepstein.com.au
            </a>
          </li>
          <li>
            <a
              href="tel:+61400000000"
              className="flex items-center gap-2 transition-colors hover:text-vermillion-500"
            >
              <Phone className="size-4 shrink-0" />
              +61 400 000 000
            </a>
          </li>
          <li className="flex items-center gap-2">
            <MapPin className="size-4 shrink-0" />
            Sydney, Australia
          </li>
        </ul>

        {/* Center: Social Links */}
        <ul className="flex gap-4">
          {socialLinks.map(({ href, icon: Icon, label }) => (
            <li key={label}>
              <a
                href={href}
                aria-label={label}
                className="flex size-10 items-center justify-center rounded-full border border-white/20 text-white/60 transition-colors hover:border-vermillion-500 hover:text-vermillion-500"
              >
                <Icon className="size-4" />
              </a>
            </li>
          ))}
        </ul>

        {/* Right: Copyright */}
        <p className="font-mono text-xs text-white/60">
          © {new Date().getFullYear()} Jeffrey Epstein. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
