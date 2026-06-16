"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const FRAMES = [
  {
    src: "/images/resort-aerial-sunset.png",
    eyebrow: "Approach",
    title: "Eight acres at Point Salines",
    sub: "Waterfront. West-facing. The drone enters from the sea.",
  },
  {
    src: "/images/resort-aerial-villas.png",
    eyebrow: "Descend",
    title: "Fourteen private villas",
    sub: "Each with its own pool and direct beach path.",
  },
  {
    src: "/images/villa-type-1-exterior.png",
    eyebrow: "Arrive",
    title: "Step up to a villa",
    sub: "Type 1 — 2,800 square feet, built for long stays.",
  },
  {
    src: "/images/villa-patio-golden-hour.png",
    eyebrow: "Terrace",
    title: "Golden hour on the patio",
    sub: "West-facing, opens directly to the lawn and sea.",
  },
  {
    src: "/images/villa-interior-living.png",
    eyebrow: "Interior",
    title: "Open-plan living",
    sub: "Climate-controlled, oversized glass on the seaward side.",
  },
  {
    src: "/images/villa-bedroom-golden-hour.png",
    eyebrow: "Suite",
    title: "Master bedroom",
    sub: "King bed, en-suite bath, sunset view.",
  },
  {
    src: "/images/beach-twilight-lounges.png",
    eyebrow: "Exit",
    title: "Beach is steps away",
    sub: "Private path from each villa to the sand.",
  },
];

export function DroneFlythrough() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let rafId: number | null = null;
    const update = () => {
      rafId = null;
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = Math.max(1, el.offsetHeight - window.innerHeight);
      const p = Math.max(0, Math.min(1, -rect.top / total));
      setProgress(p);
    };
    const onScroll = () => {
      if (rafId == null) rafId = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const N = FRAMES.length;
  const seg = 1 / N;
  const activeIdx = Math.min(N - 1, Math.max(0, Math.floor(progress * N)));

  return (
    <section
      ref={sectionRef}
      aria-label="Villa drone fly-through"
      className="relative bg-black text-white"
      style={{ height: `${N * 90}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {FRAMES.map((f, i) => {
          const start = i * seg;
          const end = (i + 1) * seg;
          const peakStart = start + seg * 0.15;
          const peakEnd = end - seg * 0.15;

          let opacity: number;
          if (i === 0 && progress < start) opacity = 1;
          else if (i === N - 1 && progress > end) opacity = 1;
          else if (progress < start) opacity = 0;
          else if (progress < peakStart) opacity = (progress - start) / (peakStart - start);
          else if (progress < peakEnd) opacity = 1;
          else if (progress < end) opacity = 1 - (progress - peakEnd) / (end - peakEnd);
          else opacity = 0;

          const local = Math.max(-0.5, Math.min(1.5, (progress - start) / seg));
          const scale = 1.06 + local * 0.08;
          const ty = (local - 0.5) * 4;

          return (
            <div
              key={f.src}
              className="absolute inset-0 will-change-[opacity,transform]"
              style={{
                opacity,
                transform: `scale(${scale}) translateY(${ty}%)`,
                transformOrigin: "center 55%",
              }}
            >
              <Image
                src={f.src}
                alt={f.title}
                fill
                priority={i < 2}
                sizes="100vw"
                className="object-cover"
              />
            </div>
          );
        })}

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/85"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-black/55 to-transparent"
        />

        <div className="absolute inset-x-0 bottom-0 pb-16 md:pb-24">
          <div className="container-prose">
            <div className="relative h-[14rem] max-w-2xl md:h-[16rem]">
              {FRAMES.map((f, i) => {
                const isActive = activeIdx === i;
                return (
                  <div
                    key={i}
                    aria-hidden={!isActive}
                    className={`absolute inset-0 transition-all duration-700 ease-out ${
                      isActive
                        ? "translate-y-0 opacity-100"
                        : "pointer-events-none translate-y-8 opacity-0"
                    }`}
                  >
                    <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-sand">
                      <span className="inline-block h-px w-8 bg-sand" />
                      {String(i + 1).padStart(2, "0")} / {String(N).padStart(2, "0")} ·{" "}
                      {f.eyebrow}
                    </span>
                    <h3 className="mt-4 text-display text-4xl text-white md:text-6xl">
                      {f.title}
                    </h3>
                    <p className="mt-4 max-w-lg text-base leading-relaxed text-white/80 md:text-lg">
                      {f.sub}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="absolute right-6 top-1/2 hidden -translate-y-1/2 flex-col items-end gap-3 md:flex md:right-10">
          {FRAMES.map((_, i) => {
            const isActive = activeIdx === i;
            return (
              <div key={i} className="flex items-center gap-3">
                <span
                  className={`text-[10px] font-medium uppercase tracking-widest transition-all duration-500 ${
                    isActive ? "text-sand opacity-100" : "text-white/40 opacity-0"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div
                  className={`w-[2px] rounded-full transition-all duration-500 ${
                    isActive ? "h-14 bg-sand" : "h-3 bg-white/35"
                  }`}
                />
              </div>
            );
          })}
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute bottom-6 right-6 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/55 md:bottom-8 md:right-10"
        >
          Scroll to fly
          <span className="text-sand">↓</span>
        </div>
      </div>
    </section>
  );
}
