"use client";

import createGlobe from "cobe";
import { useEffect, useRef } from "react";

const GRENADA: [number, number] = [12.05, -61.79];

export function SpinningGlobe({ size = 560 }: { size?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let phi = 4.4;
    let rafId = 0;

    const globe = createGlobe(canvas, {
      devicePixelRatio: dpr,
      width: size * dpr,
      height: size * dpr,
      phi,
      theta: 0.22,
      dark: 1,
      diffuse: 1.4,
      mapSamples: 18000,
      mapBrightness: 5.2,
      baseColor: [0.78, 0.78, 0.82],
      markerColor: [233 / 255, 207 / 255, 152 / 255],
      glowColor: [1, 1, 1],
      markers: [{ location: GRENADA, size: 0.08 }],
    });

    const tick = () => {
      phi += 0.0035;
      globe.update({ phi });
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      globe.destroy();
    };
  }, [size]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{ width: size, height: size, maxWidth: "100%" }}
      className="block"
    />
  );
}
