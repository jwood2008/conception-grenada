"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Slide = {
  image: string;
  eyebrow: string;
  title: string;
  body: string;
};

const SLIDES: Slide[] = [
  {
    image: "/images/villa-type-1-exterior.png",
    eyebrow: "Stay",
    title: "Two- & three-bedroom villas",
    body: "Private patios, indoor-outdoor living, and direct ocean views.",
  },
  {
    image: "/images/villa-patio-golden-hour.png",
    eyebrow: "Terrace",
    title: "Golden-hour patios",
    body: "West-facing decks that open onto the lawn and the sea.",
  },
  {
    image: "/images/villa-interior-living.png",
    eyebrow: "Interior",
    title: "Open-plan living",
    body: "Climate-controlled, oversized glass on the seaward side.",
  },
  {
    image: "/images/villa-bedroom-golden-hour.png",
    eyebrow: "Wellness",
    title: "Clinic & spa suites",
    body: "Built around recovery, restoration, and slow weeks by the water.",
  },
  {
    image: "/images/beach-access-stairs.png",
    eyebrow: "Shore",
    title: "Private beach access",
    body: "A path from each villa down to the sand and the reef.",
  },
  {
    image: "/images/ocean-view-sailboats.png",
    eyebrow: "Sea",
    title: "Reef & sailboats",
    body: "Mornings open onto turquoise water and the trade winds.",
  },
  {
    image: "/images/beach-twilight-lounges.png",
    eyebrow: "Evening",
    title: "Twilight by the sea",
    body: "Loungers, lanterns, and the long Caribbean dusk.",
  },
];

export function ExperienceCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    dragFree: false,
  });
  const [selected, setSelected] = useState(0);
  const [snaps, setSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback(
    (i: number) => emblaApi?.scrollTo(i),
    [emblaApi]
  );

  useEffect(() => {
    if (!emblaApi) return;
    const update = () => {
      setSnaps(emblaApi.scrollSnapList());
      setSelected(emblaApi.selectedScrollSnap());
    };
    emblaApi.on("select", update);
    emblaApi.on("reInit", update);
    update();
    return () => {
      emblaApi.off("select", update);
      emblaApi.off("reInit", update);
    };
  }, [emblaApi]);

  // Two-finger trackpad / horizontal-wheel scrubbing — advances the carousel
  // on horizontal-dominant wheel gestures without hijacking vertical page scroll.
  useEffect(() => {
    if (!emblaApi) return;
    const root = emblaApi.rootNode();
    let acc = 0;
    let cooling = false;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return; // let the page scroll
      e.preventDefault();
      if (cooling) return;
      acc += e.deltaX;
      if (Math.abs(acc) > 28) {
        if (acc > 0) emblaApi.scrollNext();
        else emblaApi.scrollPrev();
        acc = 0;
        cooling = true;
        window.setTimeout(() => {
          cooling = false;
        }, 260);
      }
    };
    root.addEventListener("wheel", onWheel, { passive: false });
    return () => root.removeEventListener("wheel", onWheel);
  }, [emblaApi]);

  // Gentle autoplay; pauses while the pointer is over the carousel.
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (!emblaApi || paused) return;
    const id = window.setInterval(() => emblaApi.scrollNext(), 5000);
    return () => window.clearInterval(id);
  }, [emblaApi, paused]);

  return (
    <section
      id="experience"
      aria-label="The resort, scene by scene"
      className="relative scroll-mt-20 bg-secondary py-24 md:scroll-mt-24 md:py-32"
    >
      <div className="container-prose">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <span className="eyebrow">The resort</span>
            <h2 className="mt-4 text-display text-4xl text-foreground md:text-5xl">
              A coastline, scene by scene.
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={scrollPrev}
              aria-label="Previous"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border/70 bg-card text-foreground transition-colors hover:bg-secondary"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={scrollNext}
              aria-label="Next"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border/70 bg-card text-foreground transition-colors hover:bg-secondary"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Carousel viewport — bleeds toward the right edge so the next card peeks */}
      <div
        className="mt-12 overflow-hidden"
        ref={emblaRef}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="flex touch-pan-y pl-6 md:pl-[max(1.5rem,calc((100vw-72rem)/2+3rem))]">
          {SLIDES.map((s, i) => (
            <article
              key={s.title}
              className="group relative mr-5 min-w-0 flex-[0_0_82%] sm:flex-[0_0_48%] lg:flex-[0_0_31%]"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-3xl border border-border/60 bg-card shadow-sm">
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  sizes="(min-width: 1024px) 31vw, (min-width: 640px) 48vw, 82vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  priority={i < 2}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-sand">
                    <span className="h-px w-6 bg-sand" />
                    {s.eyebrow}
                  </span>
                  <h3 className="mt-3 font-display text-2xl font-medium text-white">
                    {s.title}
                  </h3>
                  <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/85">
                    {s.body}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="container-prose mt-10 flex justify-center gap-2.5">
        {snaps.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => scrollTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === selected}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === selected
                ? "w-8 bg-primary"
                : "w-2 bg-border hover:bg-muted-foreground/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
