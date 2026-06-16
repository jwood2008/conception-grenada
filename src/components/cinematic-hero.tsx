"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const VIDEO_SRC = "/videos/grenada-flythrough-v3.mp4";
const POSTER_SRC = "/videos/grenada-flythrough-v3-poster.jpg";

const SCENES = [
  { line: "It started with a coastline.", at: 0.0 },
  { line: "Eight acres at Point Salines.", at: 0.12 },
  { line: "Fourteen luxury villas. One clinic.", at: 0.24 },
  { line: "A wellness retreat designed to rejuvenate.", at: 0.36 },
  { line: "Now open to investors.", at: 0.48 },
];

// Phase boundaries on overall scroll progress (0..1)
const SCRUB_END = 0.52;  // video done; "Now open" at full bleed
const ZOOM_START = 0.57; // small linger on "Now open" before zoom
const ZOOM_END = 0.70;   // image fully shrunk into card
const FLOW_START = 0.67;
const FLOW_END = 1.0;

const LEFT_IMAGES = [
  { src: "/images/villa-patio-golden-hour.png", alt: "Villa patio at golden hour" },
  { src: "/images/beach-twilight-lounges.png", alt: "Beach twilight lounges" },
  { src: "/images/villa-interior-living.png", alt: "Villa interior" },
  { src: "/images/resort-aerial-villas.png", alt: "Resort aerial villas" },
  { src: "/images/beach-access-stairs.png", alt: "Beach access stairs" },
  { src: "/images/villa-interior-bedroom.png", alt: "Villa bedroom interior" },
  { src: "/images/grenada-coast-real.png", alt: "Grenada coast" },
  { src: "/images/villa-type-1-exterior.png", alt: "Villa exterior" },
];

const RIGHT_IMAGES = [
  { src: "/images/beachside-villa.png", alt: "Beachside villa" },
  { src: "/images/ocean-view-sailboats.png", alt: "Ocean view with sailboats" },
  { src: "/images/villa-bedroom-golden-hour.png", alt: "Villa bedroom at golden hour" },
  { src: "/images/resort-daytime-palms.png", alt: "Resort daytime with palms" },
  { src: "/images/hero-resort-aerial-day.png", alt: "Resort aerial daytime" },
  { src: "/images/resort-aerial-sunset.png", alt: "Resort aerial at sunset" },
  { src: "/images/grenada-coast-from-sea.png", alt: "Grenada coast from sea" },
  { src: "/images/site-plan-aerial.png", alt: "Site plan aerial" },
];

const ELEVATOR_DURATION_S = 50; // seconds for one full loop

// Three turtles spaced 120° apart on the same orbit — guarantees no collision
// since they're always at different points along the path. Different bob phases
// keep their flipper strokes out-of-sync so it looks natural.
const TURTLES = [
  { swimDelay: 0,      bobDelay: 0    },
  { swimDelay: -10.67, bobDelay: -0.4 },
  { swimDelay: -21.33, bobDelay: -0.8 },
];

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

export function CinematicHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const targetTimeRef = useRef(0);
  const smoothedTimeRef = useRef(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let rafId = 0;
    let lastReportedProgress = -1;
    let lastFrameTime = performance.now();

    const readScroll = () => {
      const section = sectionRef.current;
      const video = videoRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const total = Math.max(1, section.offsetHeight - window.innerHeight);
      const p = clamp01(-rect.top / total);
      if (video?.duration && Number.isFinite(video.duration)) {
        const videoProgress = Math.min(1, p / SCRUB_END);
        targetTimeRef.current = videoProgress * video.duration;
      }
      if (Math.abs(p - lastReportedProgress) > 0.002) {
        lastReportedProgress = p;
        setProgress(p);
      }
    };

    const tick = (now: number) => {
      const video = videoRef.current;
      const dt = Math.min(0.05, (now - lastFrameTime) / 1000);
      lastFrameTime = now;

      if (video?.duration && Number.isFinite(video.duration)) {
        const alpha = 1 - Math.exp(-18 * dt);
        const current = smoothedTimeRef.current;
        const next = current + (targetTimeRef.current - current) * alpha;
        smoothedTimeRef.current = next;
        if (Math.abs(video.currentTime - next) > 0.008) {
          try {
            video.currentTime = next;
          } catch {
            // metadata not loaded yet
          }
        }
      }

      // Autonomous elevators — each column scrolls a continuous loop.
      // Doubled image list translates by -50% per loop to wrap seamlessly.
      const t = (now / 1000) / ELEVATOR_DURATION_S;
      const cycle = t - Math.floor(t); // 0..1
      const leftEl = leftColRef.current;
      const rightEl = rightColRef.current;
      if (leftEl) {
        // Left column elevators DOWN: starts at -50%, ends at 0%
        const y = -50 * (1 - cycle);
        leftEl.style.transform = `translate3d(0, ${y}%, 0)`;
      }
      if (rightEl) {
        // Right column elevators UP: starts at 0%, ends at -50%
        const y = -50 * cycle;
        rightEl.style.transform = `translate3d(0, ${y}%, 0)`;
      }

      rafId = requestAnimationFrame(tick);
    };

    readScroll();
    rafId = requestAnimationFrame(tick);
    window.addEventListener("scroll", readScroll, { passive: true });
    window.addEventListener("resize", readScroll);
    return () => {
      window.removeEventListener("scroll", readScroll);
      window.removeEventListener("resize", readScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Scene index (clamped to scrub range)
  const sceneProgress = Math.min(progress, SCRUB_END);
  let activeIdx = 0;
  for (let i = 0; i < SCENES.length; i++) {
    if (sceneProgress >= SCENES[i].at) activeIdx = i;
  }

  // Zoom-out phase
  const zoomPhase = clamp01((progress - ZOOM_START) / (ZOOM_END - ZOOM_START));
  const heroScale = lerp(1, 0.58, zoomPhase);
  const heroRadius = lerp(0, 28, zoomPhase);
  const bgOpacity = zoomPhase;
  // Card drifts from viewport center to the bottom as it shrinks,
  // then unpins and scrolls upward off the viewport with the page after zoom completes.
  const postZoomPhase = clamp01((progress - ZOOM_END) / (1 - ZOOM_END));
  const cardYVh = lerp(0, 16, zoomPhase) - postZoomPhase * 140;

  // Side-image flow phase — controls opacity only; rotation is autonomous (handled in rAF tick)
  const flowPhase = clamp01((progress - FLOW_START) / (FLOW_END - FLOW_START));

  return (
    <section
      ref={sectionRef}
      aria-label="Conception Grenada"
      className="relative bg-black text-white"
      style={{ height: "1100vh" }}
    >
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        {/* Cream surface revealed as the hero card shrinks */}
        <div
          aria-hidden
          className="absolute inset-0 bg-[oklch(0.96_0.012_85)]"
          style={{ opacity: bgOpacity }}
        />

        {/* Conception Grenada wordmark — appears at top of the cream section */}
        <div
          className="pointer-events-none absolute inset-x-0 top-[14vh] flex flex-col items-center px-6 text-center md:top-[16vh]"
          style={{ opacity: clamp01((postZoomPhase - 0.15) / 0.45) }}
        >
          <h2
            className="font-display text-zinc-900"
            style={{
              fontSize: "clamp(2.5rem, 7vw, 5.25rem)",
              fontWeight: 400,
              letterSpacing: "-0.02em",
              lineHeight: 0.95,
            }}
          >
            Conception Grenada
          </h2>
          <span className="mt-5 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.45em] text-zinc-600 md:text-[11px]">
            <span aria-hidden className="h-px w-8 bg-zinc-400" />
            Point Salines · West Indies
            <span aria-hidden className="h-px w-8 bg-zinc-400" />
          </span>
        </div>

        {/* Swimming turtles — three turtles on the same orbit, phase-offset 120° apart so they
            never collide or overlap. Each also has its own bob phase.
            Wrapper translated down 12vh so the orbit sits below the wordmark. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            opacity: clamp01((postZoomPhase - 0.05) / 0.35),
            transform: "translateY(12vh)",
          }}
        >
          {TURTLES.map((t, i) => (
            <div
              key={i}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div
                className="animate-turtle-swim"
                style={{ animationDelay: `${t.swimDelay}s` }}
              >
                <div
                  className="animate-turtle-bob drop-shadow-[0_8px_24px_rgba(0,0,0,0.4)]"
                  style={{ animationDelay: `${t.bobDelay}s` }}
                >
                  <Image
                    src="/images/conception-turtle-swim.png"
                    alt=""
                    width={220}
                    height={220}
                    className="h-[129px] w-[129px] opacity-90 md:h-[166px] md:w-[166px]"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Left elevator — autonomously scrolls downward */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 hidden w-[22%] overflow-hidden md:block"
          style={{ opacity: flowPhase }}
        >
          <div
            ref={leftColRef}
            className="flex flex-col gap-6 px-6 py-6 will-change-transform"
          >
            {[...LEFT_IMAGES, ...LEFT_IMAGES].map((img, i) => (
              <div
                key={`${img.src}-${i}`}
                className="relative aspect-[3/4] w-full flex-none overflow-hidden rounded-2xl shadow-xl ring-1 ring-black/5"
              >
                <Image src={img.src} alt={img.alt} fill sizes="22vw" className="object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Right elevator — autonomously scrolls upward */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-[22%] overflow-hidden md:block"
          style={{ opacity: flowPhase }}
        >
          <div
            ref={rightColRef}
            className="flex flex-col gap-6 px-6 py-6 will-change-transform"
          >
            {[...RIGHT_IMAGES, ...RIGHT_IMAGES].map((img, i) => (
              <div
                key={`${img.src}-${i}`}
                className="relative aspect-[3/4] w-full flex-none overflow-hidden rounded-2xl shadow-xl ring-1 ring-black/5"
              >
                <Image src={img.src} alt={img.alt} fill sizes="22vw" className="object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Hero card — full-bleed during scrub, scales down + drifts to top during zoom phase */}
        <div
          className="relative h-screen w-screen overflow-hidden"
          style={{
            transform: `translateY(${cardYVh}vh) scale(${heroScale}) translateZ(0)`,
            transformOrigin: "center center",
            borderRadius: `${heroRadius}px`,
            boxShadow: zoomPhase > 0.02
              ? `0 ${30 * zoomPhase}px ${80 * zoomPhase}px rgba(0,0,0,${0.35 * zoomPhase})`
              : "none",
            willChange: "transform, border-radius",
          }}
        >
          <video
            ref={videoRef}
            src={VIDEO_SRC}
            poster={POSTER_SRC}
            muted
            playsInline
            preload="auto"
            tabIndex={-1}
            className="pointer-events-none absolute inset-0 h-full w-full object-cover [will-change:transform] [transform:translateZ(0)]"
          />

          {/* Sharp landing image overlay — keeps crisp poster visible at scroll=0 */}
          <Image
            src={POSTER_SRC}
            alt=""
            fill
            priority
            sizes="100vw"
            aria-hidden
            className="pointer-events-none object-cover transition-opacity duration-300 ease-out"
            style={{ opacity: progress < 0.005 ? 1 : 0 }}
          />

          <div aria-hidden className="pointer-events-none absolute inset-0 bg-black/30" />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0)_30%,_rgba(0,0,0,0.55)_100%)]"
          />

          {/* Brand wordmark — anchors the landing with the resort name; fades during zoom */}
          <div
            className="pointer-events-none absolute inset-x-0 top-[14vh] flex flex-col items-center px-6 text-center md:top-[16vh]"
            style={{ opacity: 1 - zoomPhase }}
          >
            <h1
              className="font-display text-white drop-shadow-[0_4px_28px_rgba(0,0,0,0.55)]"
              style={{
                fontSize: "clamp(2.75rem, 7.5vw, 5.75rem)",
                fontWeight: 400,
                letterSpacing: "-0.02em",
                lineHeight: 0.95,
              }}
            >
              Conception Grenada
            </h1>
            <span className="mt-5 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.45em] text-white/85 md:text-[11px]">
              <span aria-hidden className="h-px w-8 bg-white/60" />
              Point Salines · West Indies
              <span aria-hidden className="h-px w-8 bg-white/60" />
            </span>
          </div>

          {/* Scene text — last line fades out during zoom-out */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-6">
            <div className="relative h-40 w-full max-w-5xl md:h-48">
              {SCENES.map((s, i) => {
                const isActive = activeIdx === i;
                const isFinal = i === SCENES.length - 1;
                const finalOpacity = isActive && isFinal ? 1 - zoomPhase : undefined;
                return (
                  <p
                    key={i}
                    aria-hidden={!isActive}
                    className={`absolute inset-0 flex items-center justify-center text-center font-display italic text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.7)] transition-all duration-[900ms] ease-out ${
                      isActive ? "translate-y-0 opacity-100 blur-0" : "translate-y-3 opacity-0 blur-sm"
                    }`}
                    style={{
                      fontSize: "clamp(2rem, 6vw, 5rem)",
                      fontWeight: 400,
                      letterSpacing: "-0.015em",
                      lineHeight: 1.1,
                      ...(finalOpacity !== undefined ? { opacity: finalOpacity } : {}),
                    }}
                  >
                    {s.line}
                  </p>
                );
              })}
            </div>
          </div>

          {/* Project title fades in as card shrinks */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col items-center p-8 text-center md:p-16">
            <span
              className="text-[10px] font-semibold uppercase tracking-[0.32em] text-white/85"
              style={{ opacity: zoomPhase }}
            >
              Conception Grenada · Point Salines
            </span>
            <h2
              className="mt-4 font-display italic text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.7)]"
              style={{
                opacity: zoomPhase,
                fontSize: "clamp(1.5rem, 3.8vw, 3.75rem)",
                fontWeight: 400,
                letterSpacing: "-0.015em",
                lineHeight: 1.05,
              }}
            >
              Eight acres. Fourteen villas. One coastline.
            </h2>
          </div>
        </div>

        {/* Scroll hint at very top of page */}
        <div
          aria-hidden
          className={`pointer-events-none absolute bottom-10 left-1/2 -translate-x-1/2 transition-opacity duration-500 ${
            progress < 0.03 ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex flex-col items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/75">
            Scroll to fly
            <span className="block h-10 w-px animate-pulse bg-white/60" />
          </div>
        </div>
      </div>
    </section>
  );
}
