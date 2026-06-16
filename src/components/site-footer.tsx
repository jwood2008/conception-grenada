import { Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/content/site";

/* Brand/social glyphs — this lucide build ships no brand icons, so inline them. */
type IconProps = { className?: string };

function InstagramIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="17.4" cy="6.6" r="1.2" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M14.5 8.5V6.8c0-.8.2-1.3 1.4-1.3H17V2.6c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.2H8.5v3h2.6V21h3.4v-9.5h2.5l.4-3h-2.9z" />
    </svg>
  );
}

function LinkedInIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M6.94 5a1.94 1.94 0 1 1-3.88 0 1.94 1.94 0 0 1 3.88 0zM3.5 8.7h3.4V21H3.5V8.7zM10 8.7h3.25v1.68h.05c.45-.85 1.56-1.75 3.2-1.75 3.43 0 4.06 2.26 4.06 5.2V21h-3.4v-5.4c0-1.29-.02-2.95-1.8-2.95-1.8 0-2.07 1.4-2.07 2.85V21H10V8.7z" />
    </svg>
  );
}

const EXPLORE = [
  { label: "The resort", href: "#experience" },
  { label: "About", href: "#about" },
  { label: "Team", href: "#team" },
  { label: "For investors", href: "#invest" },
  { label: "Reservations", href: "#waitlist" },
];

const SOCIALS = [
  { label: "Instagram", href: "#", Icon: InstagramIcon },
  { label: "Facebook", href: "#", Icon: FacebookIcon },
  { label: "LinkedIn", href: "#", Icon: LinkedInIcon },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-navy text-navy-foreground">
      <div className="container-prose grid gap-12 py-16 md:grid-cols-12 md:py-20">
        {/* Brand + socials */}
        <div className="md:col-span-5">
          <span className="font-display text-2xl font-medium tracking-tight">
            {site.name}
          </span>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-navy-foreground/70">
            {site.description}
          </p>
          <div className="mt-7 flex items-center gap-3">
            {SOCIALS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-navy-foreground/80 transition-colors hover:border-sand hover:text-sand"
              >
                <Icon className="h-[18px] w-[18px]" />
              </a>
            ))}
          </div>
        </div>

        {/* Explore nav */}
        <nav className="md:col-span-3" aria-label="Footer">
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-foreground/55">
            Explore
          </h3>
          <ul className="mt-5 space-y-3 text-sm text-navy-foreground/80">
            {EXPLORE.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="transition-colors hover:text-sand">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact */}
        <div className="md:col-span-4">
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-foreground/55">
            Connect
          </h3>
          <ul className="mt-5 space-y-3.5 text-sm text-navy-foreground/80">
            <li className="flex items-start gap-3">
              <Mail className="mt-0.5 h-4 w-4 flex-none text-sand" />
              <a
                href={`mailto:${site.contactEmail}`}
                className="transition-colors hover:text-sand"
              >
                {site.contactEmail}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="mt-0.5 h-4 w-4 flex-none text-sand" />
              <a
                href={`tel:${site.contactPhone.replace(/\s+/g, "")}`}
                className="transition-colors hover:text-sand"
              >
                {site.contactPhone}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 flex-none text-sand" />
              <span>Point Salines, St. George, Grenada</span>
            </li>
          </ul>

          <a
            href="#waitlist"
            className="mt-7 inline-flex h-11 items-center justify-center rounded-full bg-sand px-6 text-sm font-semibold text-sand-foreground transition-colors hover:bg-navy hover:text-navy-foreground"
          >
            Join the waitlist
          </a>
        </div>
      </div>

      {/* Legal bar */}
      <div className="border-t border-white/10">
        <div className="container-prose flex flex-col gap-4 py-6 text-xs text-navy-foreground/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a href="#" className="transition-colors hover:text-sand">
              Privacy
            </a>
            <a href="#" className="transition-colors hover:text-sand">
              Terms
            </a>
            <span className="text-navy-foreground/45">
              Tokenization powered by{" "}
              <a
                href="https://tierradex.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-navy-foreground/70 transition-colors hover:text-sand"
              >
                TierraDex
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
