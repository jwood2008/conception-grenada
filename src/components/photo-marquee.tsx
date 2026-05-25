const ROW_A = [
  "/images/beach-twilight-lounges.png",
  "/images/villa-interior-living.png",
  "/images/resort-aerial-sunset.png",
  "/images/villa-patio-golden-hour.png",
  "/images/beachside-villa.png",
  "/images/grenada-coast-real.png",
  "/images/villa-bedroom-golden-hour.png",
];

const ROW_B = [
  "/images/resort-aerial-villas.png",
  "/images/ocean-view-sailboats.png",
  "/images/villa-type-1-exterior.png",
  "/images/villa-interior-bedroom.png",
  "/images/resort-daytime-palms.png",
  "/images/beach-access-stairs.png",
  "/images/grenada-coast-from-sea.png",
];

export function PhotoMarquee() {
  // Duplicate each row so the keyframe can translate -50% for a seamless loop.
  const a = [...ROW_A, ...ROW_A];
  const b = [...ROW_B, ...ROW_B];

  return (
    <section
      aria-hidden
      className="relative overflow-hidden bg-background py-16 md:py-24"
    >
      <div className="space-y-4 md:space-y-6">
        <div className="marquee-track marquee-left flex gap-4 md:gap-6">
          {a.map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={`a-${i}`}
              src={src}
              alt=""
              className="marquee-photo"
              loading="lazy"
              draggable={false}
            />
          ))}
        </div>
        <div className="marquee-track marquee-right flex gap-4 md:gap-6">
          {b.map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={`b-${i}`}
              src={src}
              alt=""
              className="marquee-photo"
              loading="lazy"
              draggable={false}
            />
          ))}
        </div>
      </div>

      {/* Edge fade so photos dissolve at the viewport edges */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent md:w-32"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent md:w-32"
      />
    </section>
  );
}
