import { site } from "@/content/site";

const VIDEO_SRC = "/videos/grenada-bg.mp4";
const POSTER_SRC = "/videos/grenada-bg-poster.jpg";

/**
 * Background-video hero — autoplaying, looping, muted footage behind an
 * editorial headline and CTAs. The conventional "investment-website" hero,
 * offered at `/test` as an alternative to the scroll-scrub flythrough on `/`.
 */
export function VideoHero() {
  return (
    <section
      aria-label={site.name}
      className="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden bg-navy text-white"
    >
      {/* Background video */}
      <video
        src={VIDEO_SRC}
        poster={POSTER_SRC}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden
        tabIndex={-1}
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover"
      />

      {/* Legibility scrims */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-black/55 via-black/25 to-black/70"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0)_35%,_rgba(0,0,0,0.55)_100%)]"
      />

      {/* Content */}
      <div className="container-prose flex flex-col items-center px-6 pb-24 pt-28 text-center">
        <span className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.4em] text-white/85 md:text-[11px]">
          <span aria-hidden className="h-px w-8 bg-white/50" />
          Point Salines · West Indies
          <span aria-hidden className="h-px w-8 bg-white/50" />
        </span>

        <h1
          className="mt-6 font-display text-white drop-shadow-[0_4px_28px_rgba(0,0,0,0.55)]"
          style={{
            fontSize: "clamp(2.75rem, 8vw, 6rem)",
            fontWeight: 400,
            letterSpacing: "-0.02em",
            lineHeight: 0.98,
          }}
        >
          {site.name}
        </h1>

        <p className="mt-7 max-w-2xl text-balance font-sans text-lg leading-relaxed text-white/85 md:text-xl">
          Fourteen villas, a wellness clinic, and a private stretch of Caribbean
          coast — designed for long, slow stays by the sea.
        </p>

        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
          <a
            href="#waitlist"
            className="inline-flex h-12 items-center justify-center rounded-full bg-sand px-7 text-sm font-semibold text-sand-foreground shadow-lg shadow-black/20 transition-colors hover:bg-sand/90"
          >
            Join the waitlist
          </a>
          <a
            href="https://tierradex.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center justify-center rounded-full border border-white/40 px-7 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10"
          >
            Investor details
          </a>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/70"
      >
        Scroll
        <span className="block h-10 w-px animate-pulse bg-white/55" />
      </div>
    </section>
  );
}
