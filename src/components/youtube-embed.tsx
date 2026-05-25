"use client";

import Image from "next/image";
import { useState } from "react";
import { Play } from "lucide-react";

export function YouTubeEmbed({
  videoId,
  title,
  posterSrc,
}: {
  videoId: string;
  title: string;
  posterSrc: string;
}) {
  const [active, setActive] = useState(false);

  return (
    <div className="relative aspect-video overflow-hidden rounded-3xl border border-border/70 bg-card shadow-sm">
      {active ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setActive(true)}
          className="group absolute inset-0 cursor-pointer"
          aria-label={`Play video: ${title}`}
        >
          <Image
            src={posterSrc}
            alt={title}
            fill
            sizes="(min-width: 768px) 70vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          />
          <span
            aria-hidden
            className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/55"
          />
          <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 md:p-8">
            <div className="text-left">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/35 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                Project flythrough
              </span>
              <p className="mt-3 max-w-lg text-balance font-display text-2xl text-white md:text-3xl">
                {title}
              </p>
            </div>
            <span className="inline-flex h-16 w-16 flex-none items-center justify-center rounded-full bg-white text-primary shadow-lg transition-transform group-hover:scale-105 md:h-20 md:w-20">
              <Play className="h-7 w-7 fill-current" />
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
