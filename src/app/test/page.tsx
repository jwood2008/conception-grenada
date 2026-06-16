import type { Metadata } from "next";
import { VideoHero } from "@/components/video-hero";
import { MarketingSections } from "@/components/marketing-sections";

export const metadata: Metadata = {
  title: "Background-video hero (test)",
  robots: { index: false, follow: false },
};

/**
 * Alternative homepage layout for side-by-side comparison: same marketing
 * sections as `/`, but with a conventional background-video hero instead of
 * the scroll-scrub flythrough.
 */
export default function TestPage() {
  return (
    <>
      <VideoHero />
      <MarketingSections />
    </>
  );
}
