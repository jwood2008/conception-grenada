const ITEMS = [
  "Fourteen luxury villas",
  "8.75 acres waterfront",
  "Point Salines · Grenada",
  "Wellness clinic & spa",
  "Reg D 506(c) offering",
  "Now open to investors",
  "Opening soon",
];

/**
 * Infinite sliding marquee ticker (à la the JAY MASKA event band) — a thin
 * navy strip of key facts that scrolls horizontally, sitting between the hero
 * and the first content section. Decorative: duplicated content + CSS keyframe
 * translate of -50% loops seamlessly.
 */
export function InfoTicker() {
  return (
    <section aria-hidden className="overflow-hidden border-y border-white/10 bg-navy py-4 md:py-5">
      <div className="marquee-track marquee-left flex items-center">
        {[...ITEMS, ...ITEMS].map((item, i) => (
          <span key={i} className="flex items-center">
            <span className="px-6 text-[11px] font-medium uppercase tracking-[0.22em] text-navy-foreground/80 md:px-8 md:text-xs">
              {item}
            </span>
            <span className="text-[7px] text-sand/80">◆</span>
          </span>
        ))}
      </div>
    </section>
  );
}
