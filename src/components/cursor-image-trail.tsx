"use client";

import { useEffect, useRef, useState } from "react";

const IMAGES = [
  "/images/beach-twilight-lounges.png",
  "/images/beachside-villa.png",
  "/images/villa-interior-living.png",
  "/images/villa-patio-golden-hour.png",
  "/images/resort-aerial-sunset.png",
  "/images/villa-bedroom-golden-hour.png",
  "/images/ocean-view-sailboats.png",
  "/images/grenada-coast-real.png",
  "/images/villa-interior-bedroom.png",
  "/images/villa-type-1-exterior.png",
  "/images/resort-aerial-villas.png",
  "/images/resort-daytime-palms.png",
  "/images/beach-access-stairs.png",
  "/images/grenada-coast-from-sea.png",
];

const LIFETIME_MS = 1100;
const MIN_DISTANCE = 90;

type TrailItem = {
  id: number;
  x: number;
  y: number;
  src: string;
  rotation: number;
};

type Props = {
  /** ID of the element the trail should stay inside (uses getBoundingClientRect on each move). */
  scopeId: string;
};

export function CursorImageTrail({ scopeId }: Props) {
  const [items, setItems] = useState<TrailItem[]>([]);
  const idRef = useRef(0);
  const imgIdxRef = useRef(0);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const isCoarse =
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: coarse)").matches;
    if (isCoarse) return;

    function spawn(x: number, y: number) {
      const id = idRef.current++;
      const src = IMAGES[imgIdxRef.current % IMAGES.length];
      imgIdxRef.current++;
      const rotation = (Math.random() - 0.5) * 22;
      setItems((prev) => [...prev, { id, x, y, src, rotation }]);
      window.setTimeout(() => {
        setItems((prev) => prev.filter((it) => it.id !== id));
      }, LIFETIME_MS);
    }

    function onMove(e: MouseEvent) {
      const scope = document.getElementById(scopeId);
      if (!scope) return;
      const rect = scope.getBoundingClientRect();
      const { clientX: x, clientY: y } = e;
      if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
        return;
      }
      const last = lastPosRef.current;
      if (last) {
        const dx = x - last.x;
        const dy = y - last.y;
        if (Math.hypot(dx, dy) < MIN_DISTANCE) return;
      }
      lastPosRef.current = { x, y };
      spawn(x, y);
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [scopeId]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-30 overflow-hidden"
    >
      {items.map((it) => (
        // Plain <img> on purpose: many small ephemeral images, no need for next/image optimization
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={it.id}
          src={it.src}
          alt=""
          className="trail-card absolute"
          style={{
            left: it.x,
            top: it.y,
            transform: `translate(-50%, -50%) rotate(${it.rotation}deg)`,
          }}
        />
      ))}
    </div>
  );
}
