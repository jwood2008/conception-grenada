"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "About", href: "#about" },
  { label: "The resort", href: "#experience" },
  { label: "Team", href: "#team" },
  { label: "Investors", href: "#invest" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Solid chrome when scrolled OR when the mobile menu is open.
  const solid = scrolled || open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-300",
        solid
          ? "border-b border-border/60 bg-background/90 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="container-prose flex h-16 items-center justify-between md:h-20">
        {/* Wordmark */}
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className={cn(
            "font-display text-lg font-medium tracking-tight transition-colors md:text-xl",
            solid ? "text-foreground" : "text-white"
          )}
        >
          {site.name}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className={cn(
                "text-sm font-medium transition-colors",
                solid
                  ? "text-muted-foreground hover:text-foreground"
                  : "text-white/80 hover:text-white"
              )}
            >
              {n.label}
            </a>
          ))}
          <a
            href="#waitlist"
            className={cn(
              "inline-flex h-10 items-center justify-center rounded-full px-5 text-sm font-semibold transition-colors",
              solid
                ? "bg-primary text-primary-foreground hover:bg-sand hover:text-sand-foreground"
                : "bg-white text-navy hover:bg-sand hover:text-sand-foreground"
            )}
          >
            Join the waitlist
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className={cn(
            "inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors md:hidden",
            solid ? "text-foreground" : "text-white"
          )}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile panel */}
      {open && (
        <div className="border-t border-border/60 bg-background/95 backdrop-blur-md md:hidden">
          <nav className="container-prose flex flex-col gap-1 py-4">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-base font-medium text-foreground transition-colors hover:bg-secondary"
              >
                {n.label}
              </a>
            ))}
            <a
              href="#waitlist"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex h-12 items-center justify-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-sand hover:text-sand-foreground"
            >
              Join the waitlist
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
