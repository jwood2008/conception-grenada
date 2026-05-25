"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const HERO_IMAGES = [
  "/images/villa-interior-living.png",
  "/images/villa-patio-golden-hour.png",
  "/images/villa-interior-bedroom.png",
  "/images/villa-bedroom-golden-hour.png",
  "/images/villa-type-1-exterior.png",
  "/images/beachside-villa.png",
  "/images/beach-twilight-lounges.png",
];

const INTERVAL_MS = 4200;

export function HeroSlideshow() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIdx((n) => (n + 1) % HERO_IMAGES.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, []);

  return (
    <>
      {HERO_IMAGES.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt=""
          fill
          priority={i === 0}
          sizes="100vw"
          className={`-z-10 object-cover object-center transition-opacity duration-[1500ms] ease-in-out ${
            i === idx ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </>
  );
}
